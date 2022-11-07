import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { FaPlus } from "react-icons/fa";
import CategoryRow from "../components/CategoryRow";
import { getToken, removeUserSession } from "../utils/Storage";
import { Modal } from "react-bootstrap";
import Loading from "../components/Loading";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategory,
  ResetAddCategoryState,
  GetAllCategory,
  ResetGetCategoryState,
  DeleteCategory,
  ResetDeleteCategoryState,
  UpdateCategory,
  ResetUpdateCategoryState,
  selectionValidation,
  RootState,
  GetAllMainCategory,
  ResetGetAllMainCategoryState,
} from "core";

export default function CategoryPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [mainCategory, setMainCategory] = useState<any>("select");
  // const [oldMainCategory, setOldMainCategory] = useState("select");
  const [categoryName, setCategoryName] = useState<any>("");
  const [oldCategoryName, setOldCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState("");
  const [mainCategoryError, setMainCateGoryError] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState<any>("");
  const [inCategoriesToBag, setInCategoriesToBag] = useState(false);
  const [showCategoryToBagModal, setShowCategoryToBagModal] = useState(false);
  const [categoryToBagImage, setCategoryToBagImage] = useState("");
  const [categoryToBagBlobImage, setCategoryToBagBlobImage] = useState("");
  const [categoryToBagImageError, setCategoryToBagImageError] = useState("");
  const [filterData, setFilterData] = useState({
    filterMainCategory: "select",
    filterCategoryName: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { data2, error2 } = useSelector(
    (state: RootState) => state.getAllMainCategoryReducer
  );

  let { getdata2, geterror2 } = useSelector(
    (state: RootState) => state.getAllCategoryReducer
  );

  let { data, error } = useSelector(
    (state: RootState) => state.addCategoryReducer
  );

  let { dltdata3, dlterror3 } = useSelector(
    (state: RootState) => state.deleteCategoryReducer
  );

  let { data4, error4 } = useSelector(
    (state: RootState) => state.updateCategoryReducer
  );

  async function getData() {
    try {
      setLoading(true);
      let reqData1: any = {
        authToken: localStorage.getItem("token"),
      };
      await dispatch<any>(GetAllCategory(reqData1));
      NotificationManager.success("Get All Categories  successfully", "", 2000);
      setCategories(getdata2);
      setpgData(getdata2);

      let reqData2: any = {
        authToken: localStorage.getItem("token"),
      };
      await dispatch<any>(GetAllMainCategory(reqData2));
      NotificationManager.success(
        "Get All Main Categories  successfully",
        "",
        2000
      );
      setMainCategories(data2);
      setpgData(getdata2);
      setLoading(false);
    } catch (geterror2) {
      dispatch<any>(ResetGetAllMainCategoryState());
      dispatch<any>(ResetGetCategoryState());
      NotificationManager.error(geterror2, "", 2000);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (getdata2 === undefined) {
      getData();
    } else {
      setCategories(getdata2);
    }
  }, [getdata2]);

  const filterDataChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let filteredCategories = categories;
    if (name === "filterMainCategory") {
      if (value !== "select") {
        filteredCategories = filteredCategories.filter(
          (category) => category.mainCategory._id === value
        );
      }
    }
    if (filterCategoryName.length > 0) {
      filteredCategories = filteredCategories.filter((category) => {
        let tempSearch = filterCategoryName.toLowerCase();
        let tempName = category.categoryName
          .toLowerCase()
          .slice(0, tempSearch.length);
        if (tempSearch === tempName) {
          return category;
        }
        return null;
      });
    }

    if (name === "filterCategoryName") {
      if (value.length > 0) {
        filteredCategories = filteredCategories.filter((category) => {
          let tempSearch = value.toLowerCase();
          let tempName = category.categoryName
            .toLowerCase()
            .slice(0, tempSearch.length);
          if (tempSearch === tempName) {
            return category;
          }
          return null;
        });
      }
      if (filterMainCategory !== "select") {
        filteredCategories = filteredCategories.filter(
          (category) => category.mainCategory._id === filterMainCategory
        );
      }
    }
    setpgData(filteredCategories);
    // setCurrentPage(1);
    setFilterData({ ...filterData, [name]: value });
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    setCategoryName(event.target.value);
    // console.log("category change...", categoryName);
  };

  const mainCategoryChange = (event: any) => {
    event.preventDefault();
    setMainCategory(event.target.value);
    getData();
  };

  const addCategory = async () => {
    let isValid = true;

    if (categoryName === "") {
      setErrors("Category name should not be empty");
      isValid = false;
    } else {
      setErrors("");
    }

    if (mainCategory === "select") {
      setMainCateGoryError("Select Maincategory");
      isValid = false;
    } else {
      setMainCateGoryError("");
    }

    if (!isValid) {
      return;
    }

    if (isUpdate) {
      try {
        setLoading(true);
        let reqData: any = {
          categoryid: id,
          updatedcategoryname: categoryName,
          authToken: localStorage.getItem("token"),
        };
        //   console.log("reqdata...:", reqData);
        await dispatch<any>(UpdateCategory(reqData));
        getData();
        closeModel();
        setCategoryName("");
        setLoading(false);
        setIsUpdate(false);
        setErrors("");
        NotificationManager.success("Category updated successfully", "", 2000);
      } catch (error4: any) {
        dispatch<any>(ResetUpdateCategoryState());
        console.log("error message:::", error4);
        removeUserSession();
        navigate("/");
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);

        let reqData: any = {
          categoryname: categoryName,
          maincategoryname: mainCategory,
          authToken: localStorage.getItem("token"),
        };
        //   console.log("reqdata of add category....", reqData);
        await dispatch<any>(AddCategory(reqData));
        // console.log("add category disptched called.....");
        NotificationManager.success("Category added successfully", "", 2000);
        getData();
        closeModel();
        setCategoryName("");
        setOldCategoryName(categoryName);
        setLoading(false);
        setErrors("");
      } catch (error: any) {
        dispatch<any>(ResetAddCategoryState());
        removeUserSession();
        navigate("/");
        setLoading(false);
      }
    }
  };

  const updateCategory = async (category: any) => {
    setIsUpdate(true);
    setId(category.category._id);
    setShowModal(true);
    setOldCategoryName(category.category.Categoryname);
    setCategoryName(category.category.Categoryname);
    setMainCategory(category.category.mainCategory.mainCategory);
    setInCategoriesToBag(inCategoriesToBag);
  };

  const deleteCategory = async (id: any) => {
    console.log("id:", id);
    if (window.confirm("Are you sure, you want to delete?")) {
      try {
        setLoading(true);

        let reqData: any = {
          categoryid: id,
          authToken: localStorage.getItem("token"),
        };
        // console.log("reqDaata:::", reqData);
        await dispatch<any>(DeleteCategory(reqData));
        NotificationManager.success("Category deleted successfully", "", 2000);
        getData();
        // setCurrentPage(1);
        setLoading(false);
      } catch (dlterror3: any) {
        setLoading(false);
        console.error(dlterror3);
        if (dlterror3.response.status === 401) {
          dispatch<any>(ResetDeleteCategoryState());
          NotificationManager.error(dlterror3, "", 2000);
          removeUserSession();
          navigate("/");
        } else if (dlterror3.response.status === 409) {
          dispatch<any>(ResetDeleteCategoryState());
          NotificationManager.error(dlterror3, "", 2000);
          alert("Category is not allowed to delete");
        }
      }
    }
  };

  const closeModel = () => {
    setShowModal(false);
    setIsUpdate(false);
    setCategoryName("");
    setMainCategory("select");
    setErrors("");
    setMainCateGoryError("");
    setId("");
    setInCategoriesToBag(false);
  };

  const closeCategoryToBagModal = () => {
    setShowCategoryToBagModal(false);
    setCategoryName("");
    setCategoryToBagBlobImage("");
    setCategoryToBagImage("");
    setId("");
    setCategoryToBagImageError("");
  };

  const openCategoryToBagModal = (categoryName: any, id: any) => {
    setId(id);
    setCategoryName(categoryName);
    setShowCategoryToBagModal(true);
  };

  const categoryToBagImageChange = (event: any) => {
    const image = event.target.files[0];
    setCategoryToBagBlobImage(URL.createObjectURL(image));
    setCategoryToBagImage(image);
  };

  const addCategoryToBag = async () => {
    // if (categoryToBagImage === "" || categoryToBagImage === null) {
    //   setCategoryToBagImageError("Image is required");
    //   return;
    // }
    // try {
    //   setLoading(true);
    //   const formData = new FormData();
    //   formData.append("category", id);
    //   formData.append("image", categoryToBagImage);
    //   await CategoriesToBagService.addCategoryToBag(formData, getToken());
    //   closeCategoryToBagModal();
    //   getData();
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    //   if (error.response.status === 401) {
    //     removeUserSession();
    //     props.history.push("/dashboard/login");
    //   }
    //   setLoading(false);
    // }
  };

  const deleteCategoryToBag = async (id: any) => {
    // if (
    //   window.confirm("Are you sure you want to remove from categories to bag?")
    // ) {
    //   try {
    //     setLoading(true);
    //     await CategoriesToBagService.deleteCategoryToBag(id, getToken());
    //     getData();
    //     setLoading(false);
    //   } catch (error) {
    //     if (error.response.status === 401) {
    //       removeUserSession();
    //       props.history.push("/dashboard/login");
    //     }
    //   }
    // }
  };

  // *************** PAGINATION ***************
  const [pgdata, setpgData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [pageNumberLimit] = useState(25);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(25);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages: any[] = [];
  for (let i = 1; i <= Math.ceil(25 / itemsPerPage); i++) {
    pages.push(i);
  }
  //   let i = 1; i <= Math.ceil(pgdata.length / itemsPerPage); i++
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: any =
    pgdata === undefined
      ? null
      : pgdata.slice(indexOfFirstItem, indexOfLastItem);

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

  const { filterMainCategory, filterCategoryName } = filterData;

  if (loading) {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }

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
                <FaPlus style={{ fontSize: "13px" }} /> Add Category
              </button>
              <div>
                <div className="form-group mt-4">
                  <label
                    className="form-control-label mb-1"
                    htmlFor="filterCategoryName"
                  >
                    Category Name
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    id="filterCategoryName"
                    name="filterCategoryName"
                    value={filterCategoryName}
                    onChange={filterDataChange}
                  />
                </div>

                <div className="form-group mt-3">
                  <label
                    className="form-control-label mb-1"
                    htmlFor="filterMainCategory"
                  >
                    Maincategory
                  </label>
                  <select
                    className="form-control"
                    name="filterMainCategory"
                    id="filterMainCategory"
                    value={filterMainCategory}
                    onChange={filterDataChange}
                  >
                    <option value="select"> Select Maincategory</option>
                    {data2 === undefined
                      ? null
                      : data2.map(({ mainCategory, _id }, index) => {
                          return (
                            <option
                              value={mainCategory}
                              className="text-capitalize"
                              key={_id}
                              id={index}
                            >
                              {mainCategory}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
            </div>
            <div className="col col-md-9 col-lg-10">
              <div>
                <table className="table table-hover table-bordered text-center bg-white table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-spacing">No.</th>
                      <th className="text-spacing">Maincategory</th>
                      <th className="text-spacing">Category</th>
                      <th className="text-spacing">In Categories To Bag</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getdata2 === undefined
                      ? null
                      : getdata2?.map((category, index) => {
                          return (
                            <CategoryRow
                              category={category}
                              index={(currentPage - 1) * itemsPerPage + index}
                              id={category._id}
                              // key={index}
                              deleteCategory={deleteCategory}
                              updateCategory={updateCategory}
                              openCategoryToBagModal={openCategoryToBagModal}
                              deleteCategoryToBag={deleteCategoryToBag}
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
      </div>

      {/* ------------------------------- ADD CATEGORY MODAL ------------------------------- */}
      <Modal show={showModal} size="lg" onHide={closeModel}>
        <Modal.Header className="bg-pink text-white border">
          <Modal.Title>{isUpdate ? "Update" : "Add"} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdate === false && (
            <div>
              <div className="form-group">
                <label className="form-control-label" htmlFor="category">
                  Main Category
                </label>
                <select
                  name="mainCategory"
                  id="mainCategory"
                  className="form-control login-form-control"
                  value={mainCategory}
                  onChange={mainCategoryChange}
                >
                  <option value="select">Select Maincategory</option>
                  {data2 === undefined
                    ? null
                    : data2.map(({ mainCategory, _id }, index) => {
                        return (
                          <option
                            value={mainCategory}
                            className="text-capitalize"
                            key={index}
                            id={_id}
                          >
                            {mainCategory}
                          </option>
                        );
                      })}
                </select>
                <p className="text-danger mb-0 font-weight-bold">
                  {mainCategoryError}
                </p>
              </div>
              <div className="form-group">
                <label className="form-control-label" htmlFor="category">
                  Category Title
                </label>
                <input
                  type="text"
                  className="form-control login-form-control"
                  id="category"
                  value={categoryName}
                  onChange={handleChange}
                />
                <p className="text-danger mb-0 font-weight-bold">{error}</p>
              </div>
            </div>
          )}
          {isUpdate && (
            <div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label
                      className="form-control-label"
                      htmlFor="mainCategory"
                    >
                      Main Category
                    </label>
                    <input
                      name="mainCategory"
                      id="mainCategory"
                      className="form-control login-form-control"
                      value={mainCategory}
                      disabled
                    ></input>
                    <p className="text-danger mb-0 font-weight-bold">
                      {mainCategoryError}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="category">
                      Change Category Title
                    </label>
                    <input
                      type="text"
                      className="form-control login-form-control"
                      id="category"
                      value={categoryName}
                      onChange={handleChange}
                    />
                    <p className="text-danger mb-0 font-weight-bold">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary btn-radius-0"
            onClick={closeModel}
          >
            Close
          </button>
          <button className="btn btn-pink-2 btn-radius-0" onClick={addCategory}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* ---------------------------- ADD CATEGORY TO BAG MODAL ---------------------------- */}
      <Modal
        show={showCategoryToBagModal}
        size="lg"
        onHide={closeCategoryToBagModal}
      >
        <Modal.Header className="bg-pink text-white border">
          <Modal.Title>Add Category To Bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="form-control-label" htmlFor="category">
              Category Title
            </label>
            <input
              type="text"
              className="form-control login-form-control"
              value={categoryName}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-control-label" htmlFor="categoryToBagImage">
              Image
            </label>
            <input
              type="file"
              className="form-control border-0"
              name="categoryToBagImage"
              id="categoryToBagImage"
              onChange={categoryToBagImageChange}
            />
            <p className="text-danger mb-0 font-weight-bold">
              {categoryToBagImageError}
            </p>
            {categoryToBagBlobImage && (
              <div
                className="card mx-auto add-product-card mt-2"
                style={{ border: "none", width: "fit-content" }}
              >
                <div className="card-body">
                  <div className="deals-img-container">
                    <img
                      src={categoryToBagBlobImage}
                      alt="categoryToBag"
                      width="120px"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary btn-radius-0"
            onClick={closeCategoryToBagModal}
          >
            Close
          </button>
          <button
            className="btn btn-pink-2 btn-radius-0"
            onClick={addCategoryToBag}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
