import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { FaPlus } from "react-icons/fa";
import { Modal } from "react-bootstrap";
//import MainCategoryService from "../../services/MainCategoryService";
import MainCategoryRow from "../components/MainCategoryRow";
import { getToken, removeUserSession } from "../utils/Storage";
import {
  AddMainCategory,
  GetAllMainCategory,
  GetMainCategoryById,
  DeleteMainCategory,
  UpdateMainCategory,
  ResetAddMainCategoryState,
  ResetGetAllMainCategoryState,
  ResetGetMainCategoryByIdState,
  ResetDeleteMainCategoryState,
  ResetUpdateMainCategoryState,
  RootState,
} from "core";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export default function MainCategoriesPage(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mainCategories, setMainCategories] = useState<any>([]);
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [oldMainCategoryName, setOldMainCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("");
  const [errors, setErrors] = useState("");
  const [filterMainCategoryName, setFilterMainCategoryName] = useState("");

  let { data, error } = useSelector(
    (state: RootState) => state.addMainCategoryReducer
  );

  let { data2, error2 } = useSelector(
    (state: RootState) => state.getAllMainCategoryReducer
  );

  let { data3, error3 } = useSelector(
    (state: RootState) => state.getMainCategoryByIdReducer
  );

  let { data4, error4 } = useSelector(
    (state: RootState) => state.deleteMainCategoryReducer
  );

  let { data5, error5 } = useSelector(
    (state: RootState) => state.updateMainCategoryReducer
  );

  // console.log("data:::", data);
  // console.log("data2:::", data2);
  // console.log("data3:::", data3);

  async function getData() {
    try {
      setLoading(true);
      let reqData: any = {
        authToken: localStorage.getItem("token"),
      };
      await dispatch<any>(GetAllMainCategory(reqData));
      NotificationManager.success(
        "Get All Main Categories  successfully",
        "",
        2000
      );
      // setMainCategories(data2);
      // setpgData(data2);
      setLoading(false);
    } catch (error2) {
      console.error(error2);
      dispatch<any>(ResetGetAllMainCategoryState());
      NotificationManager.error(error2, "", 2000);
      setLoading(false);
    }
  }

  // async function getDataById(id: any) {
  //   try {
  //     setLoading(true);
  //     let reqData: any = {
  //       productid: id,
  //       authToken: localStorage.getItem("token"),
  //     };
  //     console.log("reqdata:::", reqData);
  //     await dispatch<any>(GetMainCategoryById(reqData));
  //     NotificationManager.success(
  //       "Get Main Category by Id successfully",
  //       "",
  //       2000
  //     );

  //     setMainCategories(data3);
  //     // console.log("setmaincategories", mainCategories);
  //     // setpgData(data3);
  //     // console.log("setpgdata::", pgdata);
  //     setLoading(false);
  //   } catch (error3) {
  //     console.error(error3);
  //     dispatch<any>(ResetGetMainCategoryByIdState());
  //     NotificationManager.error(error3, "", 2000);
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    getData();
    let token = localStorage.getItem("token");
    // alert(token)
  }, []);

  const filterMainCategoryNameChange = (event: any) => {
    event.preventDefault();
    // console.log("event:", event);
    let value = event.target.value;
    setMainCategories(data2);
    let filteredMainCategories: any = [...mainCategories];
    console.log("filteredMainCategories", filteredMainCategories);
    if (value.length > 0) {
    filteredMainCategories = filteredMainCategories.filter(
      (mainCategory: any) => {
        let tempSearch = value.toLowerCase();
        let tempName = mainCategory.mainCategory
          .toLowerCase()
          .slice(0, tempSearch.length);
        console.log("tempname::", tempName);
        if (tempSearch === tempName) {
          
          // getDataById("634ff13b1c59d27be45e6b18");
          return mainCategory;
        }
        return null;
      }
    );
    }
    setpgData(filteredMainCategories);
    setFilterMainCategoryName(value);
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    setMainCategoryName(event.target.value);
    console.log(mainCategoryName);
  };

  const addMainCategory = async () => {
    let token = getToken();
    // console.log("Token", token);
    if (mainCategoryName === "") {
      setErrors("Main Category name should not be empty");
      return;
    }

    if (isUpdate) {
      try {
        setLoading(true);
        let reqData: any = {
          productid: id,
          upatedname: mainCategoryName,
          authToken: localStorage.getItem("token"),
        };
        await dispatch<any>(UpdateMainCategory(reqData));
        closeModel();
        setMainCategoryName("");
        setLoading(false);
        setIsUpdate(false);
        setErrors("");
        getData();
        NotificationManager.success(
          "Maincategory updated successfully",
          "",
          2000
        );
      } catch (error5: any) {
        console.log("error message:::", error5);
        removeUserSession();
        navigate("/");
        setLoading(false);
      }
      console.log("if section: update");
    } else {
      try {
        // setLoading(true);
        let reqData: any = {
          maincategoryName: mainCategoryName,
          authToken: localStorage.getItem("token"),
        };
        await dispatch<any>(AddMainCategory(reqData));
        console.log("main category name:", mainCategoryName);
        closeModel();
        setMainCategoryName("");
        setLoading(false);
        setIsUpdate(false);
        setErrors("");
        setFilterMainCategoryName(mainCategoryName);
        console.log();
        NotificationManager.success(
          "Maincategory updated successfully",
          "",
          3000
        );
      } catch (error: any) {
        NotificationManager.error(error, "", 2000);
        dispatch<any>(ResetAddMainCategoryState());
        removeUserSession();
        navigate("/");
        setLoading(false);
      }
    }
  };

  const updateCategory = (id: any, name: any) => {
    setIsUpdate(true);
    setId(id);
    setShowModal(true);
    setOldMainCategoryName(name);
  };

  const deleteCategory = async (id: any) => {
    if (window.confirm("Are you sure, you want to delete?")) {
      try {
        setLoading(true);
        let reqData: any = {
          productid: id,
          authToken: localStorage.getItem("token"),
        };
        console.log("reqDaata:::", reqData);
        await dispatch<any>(DeleteMainCategory(reqData));
        NotificationManager.success(
          "Maincategory deleted successfully",
          "",
          2000
        );
        getData();
        setLoading(false);
      } catch (error4: any) {
        setLoading(false);
        console.error(error4);
        if (error4.response.status === 401) {
          dispatch<any>(ResetDeleteMainCategoryState());
          NotificationManager.error(error4, "", 2000);
          removeUserSession();
          navigate("/");
        } else if (error4.response.status === 409) {
          dispatch<any>(ResetDeleteMainCategoryState());
          NotificationManager.error(error4, "", 2000);
          alert("Main Category is not allowed to delete");
        }
      }
    }
  };

  const closeModel = () => {
    setShowModal(false);
    setIsUpdate(false);
    setId("");
  };

  // *************** PAGINATION ***************
  const [pgdata, setpgData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [pageNumberLimit] = useState(25);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(25);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages: any[] = [];
  for (let i = 1; i <= Math.ceil(pgdata.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pgdata.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (number: any) => {
    setCurrentPage(number);
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          onClick={() => handleClick(number)}
          className={`page-item  ${currentPage === number ? "active" : null}`}
        >
          <div className="page-link">{number}</div>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtnClick = () => {
    if (currentPage !== pages[pages.length - 1]) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePreviousBtnClick = () => {
    if (currentPage !== pages[0]) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  let pageIncrementBtn;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="page-item">
        <span className="page-link" onClick={handleNextBtnClick}>
          &hellip;
        </span>
      </li>
    );
  }

  let pageDecrementBtn;
  if (minPageNumberLimit >= pageNumberLimit) {
    pageDecrementBtn = (
      <li className="page-item">
        <span className="page-link" onClick={handlePreviousBtnClick}>
          &hellip;
        </span>
      </li>
    );
  }
  // *************** END OF PAGINATION ***************

  return (
    <>
      <Navbar />
      <div className="">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col col-md-3 col-lg-2">
              <button
                className="btn add-btn btn-block mt-2"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                <FaPlus style={{ fontSize: "13px" }} /> Add Maincategory
              </button>

              <div>
                <div className="form-group mt-4">
                  <label
                    className="form-control-label mb-1"
                    htmlFor="mainCategoryName"
                  >
                    Maincategory Name
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    id="mainCategoryName"
                    name="mainCategoryName"
                    value={filterMainCategoryName}
                    onChange={filterMainCategoryNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="col col-md-9 col-lg-10">
              <table className="table table-hover table-bordered text-center bg-white table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th className="text-spacing">No.</th>
                    <th className="text-spacing">Maincategory</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data2 === undefined
                    ? null
                    : data2.map(({ mainCategory, _id }, index) => {
                        return (
                          <MainCategoryRow
                            mainCategory={mainCategory}
                            index={index}
                            key={index}
                            id={_id}
                            deleteCategory={deleteCategory}
                            updateCategory={updateCategory}
                          />
                        );
                      })}
                </tbody>
              </table>

              {/* *************** PAGINATION *************** */}
              <div className="pt-2">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === pages[0] ? "disabled" : null
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={handlePreviousBtnClick}
                    >
                      Previous
                    </span>
                  </li>

                  {pageDecrementBtn}

                  {renderPageNumbers}

                  {pageIncrementBtn}

                  <li
                    className={`page-item ${
                      currentPage === pages[pages.length - 1]
                        ? "disabled"
                        : null
                    }`}
                  >
                    <span className="page-link" onClick={handleNextBtnClick}>
                      Next
                    </span>
                  </li>
                </ul>
              </div>
              {/* *************** END OF PAGINATION *************** */}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------- ADD MAIN CATEGORY MODAL ----------------------------- */}
      <Modal show={showModal} size="lg" onHide={closeModel}>
        <Modal.Header className="bg-pink text-white border">
          <Modal.Title>{isUpdate ? "Update" : "Add"} Main Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdate && (
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="oldMainCategoryName"
              >
                Old Main Category Title
              </label>
              <input
                type="text"
                className="form-control login-form-control"
                id="oldMainCategoryName"
                value={oldMainCategoryName}
                disabled
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-control-label" htmlFor="mainCategoryName">
              {isUpdate && "New "}Main Category Title
            </label>
            <input
              type="text"
              className="form-control login-form-control"
              id="mainCategoryName"
              value={mainCategoryName}
              onChange={handleChange}
            />
            <p className="text-danger mb-0 font-weight-bold">{error}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary btn-radius-0"
            onClick={closeModel}
          >
            Close
          </button>
          <button
            className="btn btn-pink-2 btn-radius-0"
            onClick={addMainCategory}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
