import React, { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MainContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../Redux/Reducer/UserSlice";
import axios from "axios";
import { moveToCart } from "../../Redux/Reducer/CartSlice";

export default function Login() {
  const { API_BASE_URL, toastNotify } = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const cart = useSelector((state) => state.cart.data);
  console.log(cart, 'cart');

  const loginUser = (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(API_BASE_URL + "/user/login", data)
      .then((success) => {
        console.log(success, 'user-login');
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            UserLogin({ data: success.data.user, token: success.data.token })
          );

          axios
            .post(
              API_BASE_URL + `/user/movetodb/${success.data.user._id}`,
              cart
            )
            .then((res) => {
              console.log(res, "user-movetodb");
              const latestCart = res.data.latestCart;
              let totalOriginalPrice = 0;
              let totalFinalPrice = 0;
              console.log(latestCart, "latestCart");

              const data =
                Array.isArray(latestCart) &&
                latestCart.map((cartItem, cartIndex) => {
                  totalOriginalPrice +=
                    cartItem.product_id.original_price * cartItem.qty;
                  totalFinalPrice +=
                    cartItem.product_id.finel_price * cartItem.qty;
                  return {
                    product_id: cartItem.product_id,
                    qty: cartItem.qty,
                    size: cartItem.size,
                  };
                });

              dispatch(
                moveToCart({ data, totalOriginalPrice, totalFinalPrice })
              );
            })
            .catch((err) => {
              console.log(err);
            });

          if (searchParams.get("ref") == "cart") {
            navigate("/cart");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={loginUser}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#967b2a]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#967b2a]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#967b2a] hover:bg-[#7d6722] text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={`/userregister?${searchParams.toString()}`}>
            <span className="text-[#967b2a] hover:underline font-medium">
              Register here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
