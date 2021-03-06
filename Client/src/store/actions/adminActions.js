import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
  createNewSpecialtyService,
  deleteSpecialty,
  editSpecialtyService,
} from "../../services/userService";
import { toast } from "react-toastify";
import { dispatch } from "../../redux";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({ type: actionTypes.FETCH_ROLE_FAILED });

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};

export const createNewSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewSpecialtyService(data);

      if (res && res.errCode === 0) {
        toast.success("T???o th??nh c??ng !");
        dispatch(saveSpecialtySuccess());
        dispatch(fetchAllSpecialtyStart());
      } else {
        dispatch(saveSpecialtyFailed());
      }
    } catch (e) {
      dispatch(saveSpecialtyFailed());
      console.log("saveSpecialtyFailed error", e);
    }
  };
};
export const saveSpecialtySuccess = () => ({
  type: actionTypes.CREATE_SPECIALTY_SUCCESS,
});
export const saveSpecialtyFailed = () => ({
  type: actionTypes.CREATE_SPECIALTY_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("T???o ng?????i d??ng th??nh c??ng !");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserSuccess error", e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({ type: actionTypes.CREATE_USER_FAILED });

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("???? x???y ra l???i !");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("???? x???y ra l???i !");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersStart error", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("???? x??a t??i kho???n th??nh c??ng !");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("???? x???y ra l???i !");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("???? x???y ra l???i !");
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error ", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success(" C???p nh???t th??nh c??ng !");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("???? x???y ra l???i !");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("???? x???y ra l???i !");
      dispatch(editUserFailed());
      console.log("EditUserFailed error ", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success(" L??u th??ng tin b??c s?? th??nh c??ng !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error(" L??u th???t b???i !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error(" L??u th???t b???i !");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("fetchRequiredDoctorInforFailed error", e);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

export const fetchAllSpecialtyStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllSpecialtySuccess(res.data.reverse()));
      } else {
        toast.error("???? x???y ra l???i !");
        dispatch(fetchAllSpecialtyFailed());
      }
    } catch (e) {
      toast.error("???? x???y ra l???i !");
      dispatch(fetchAllSpecialtyFailed());
      console.log("fetchAllSpecialtyStart error", e);
    }
  };
};
export const fetchAllSpecialtySuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  specialty: data,
});
export const fetchAllSpecialtyFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
});

export const deleteASpecialty = (name) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpecialty(name);
      if (res && res.errCode === 0) {
        toast.success("???? x??a th??nh c??ng !");
        dispatch(deleteSpecialtySuccess());
        dispatch(fetchAllSpecialtyStart());
      } else {
        toast.error("???? x???y ra l???i  1!");
        dispatch(deleteSpecialtyFailed());
      }
    } catch (e) {
      toast.error("???? x???y ra l???i  2!");
      dispatch(deleteSpecialtyFailed());
      console.log("deleteSpecialtyFailed error ", e);
    }
  };
};
export const deleteSpecialtySuccess = () => ({
  type: actionTypes.DELETE_SPECIALTY_SUCCESS,
});
export const deleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_SPECIALTY_FAILED,
});

export const editASpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success("Update th??nh c??ng !");
        dispatch(editSpecialtySuccess());
        dispatch(fetchAllSpecialtyStart());
      } else {
        toast.error("???? x???y ra l???i 1!");
        dispatch(editSpecialtyFailed());
      }
    } catch (e) {
      toast.error("???? x???y ra l???i  2!");
      dispatch(editSpecialtyFailed());
      console.log("editSpecialtyFailed error ", e);
    }
  };
};
export const editSpecialtySuccess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});
export const editSpecialtyFailed = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAILED,
});
