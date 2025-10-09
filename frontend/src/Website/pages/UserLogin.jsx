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

  const loginUser = (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(API_BASE_URL + "/user/login", data)
      .then((success) => {
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
              const latestCart = res.data.latestCart;
              let totalOriginalPrice = 0;
              let totalFinalPrice = 0;

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
          } else if (searchParams.get("ref") == "address"){
            navigate("/my/address");
          } else if (searchParams.get("ref") == "order"){
            navigate("/my/orders");
          } else if (searchParams.get("ref") == "profile"){
            navigate("/my/profile");
          } else if (searchParams.get("ref") == "profile_edit"){
            navigate("/my/profile/edit");
          } else if (searchParams.get("ref") == "address_add"){
            navigate("/my/address/add");
          } else if (searchParams.get("ref") == "wishlist"){
            navigate("/wishlist");
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
    <div className="min-h-screen bg-[url('https://res.cloudinary.com/dbglxb4z0/image/upload/v1760000131/b2_xf1pvs.jpg')]">
      <div className="bg-black/50 w-full min-h-screen flex justify-center md:items-center md:p-8">
      <div className="w-full md:max-w-md bg-white px-8 color pb-8 pt-8 md:pt-4">
        <div className="flex justify-center">
          <img src="https://res.cloudinary.com/dbglxb4z0/image/upload/v1759999596/logo_yldy7i.png" alt="logo" className="w-20 md:w-28"/>
        </div>
        <h2 className="text-4xl font-bold mb-6 text-center font whitespace-nowrap">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={loginUser}>
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-zinc-600"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-zinc-600"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="custom-button"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to={`/userregister?${searchParams.toString()}`}>
            <span className="text-red-800 hover:underline font-medium">
              Register here
            </span>
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
