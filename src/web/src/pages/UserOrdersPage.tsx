import React, { useState } from "react";
import Navbar from "../components/NavBar";
import EmptyBanner from "../components/EmptyBanner";
// import Loading from "../../components/Loading";
import { useEffect } from "react";
// import OrderService from "../../services/OrderService";
// import { getToken, removeUserSession } from "../../Utils/Storage";
import Order from "../components/Order";
//import CustomerService from "../../services/CustomerService";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

export default function UserOrdersPage(props: any) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    // const id = props.match.params.id;

    // useEffect(() => {
    //   async function getData() {
    //     try {
    //       setLoading(true);

    //       let user = await CustomerService.getCustomerById(id, getToken());
    //       setUser(user.data);

    //       let orders = await OrderService.getOrdersByCustomerId(id, getToken());
    //       setOrders(orders.data);

    //       setLoading(false);
    //     } catch (error) {
    //       if (error.response.status === 401) {
    //         props.history.push("/login");
    //         removeUserSession();
    //       }
    //       setLoading(false);
    //     }
    //   }

    //   getData();
    // }, []);

    // if (loading) {
    //     return (
    //         <>
    //             <Navbar />
    //             <Loading />
    //         </>
    //     );
    // }

    if (orders.length < 1) {
        return (
            <>
                <Navbar />
                {/* <div>
                    <Link to="/" className="text-capitalize back-btn">
                        <MdKeyboardBackspace className="back-btn-arrow" />
                    </Link>
                </div>

                <div className="text-center pt-5">
                    <div className="h5 font-weight-bold text-capitalize">
                        Name : { }
                    </div>
                    <div className="h5 font-weight-bold">E-mail : { }</div>
                    <div className="h5 font-weight-bold text-capitalize">
                        number : { }
                    </div>
                    <div className="h5 font-weight-bold text-capitalize">
                        total orders : {orders.length}
                    </div>
                </div> */}
                <EmptyBanner title="no orders yet" />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div>
                <Link to="/dashboard/users" className="text-capitalize back-btn">
                    <MdKeyboardBackspace className="back-btn-arrow" />
                </Link>
            </div>

            <div className="container-fluid">
                <div className="container mt-2 py-4" style={{ width: "fit-content" }}>
                    <div className="text-center">
                        <div className="h5 font-weight-bold text-capitalize">
                            Name : { }
                        </div>
                        <div className="h5 font-weight-bold">E-mail : { }</div>
                        <div className="h5 font-weight-bold text-capitalize">
                            number : { }
                        </div>
                        <div className="h5 font-weight-bold text-capitalize">
                            total orders : {orders.length}
                        </div>
                    </div>

                    {/* <ul className="list-group">
                        {orders.map((order) => {
                            return (
                                <Order
                                //  products={order.products}
                                //  key={order._id}
                                //   id={order._id}
                                //  totalPrice={order.totalPrice}
                                //  totalItems={order.totalItems}
                                //   orderDate={order.orderDate}
                                />
                            );
                        })}
                    </ul> */}
                </div>
            </div>
        </>
    );
}
