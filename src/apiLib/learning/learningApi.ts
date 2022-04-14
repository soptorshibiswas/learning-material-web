import { AxiosResponse } from "axios";
import { apiRequest } from "../apiRequest";
import {
  CREATE_COURSE,
  CREATE_DEPT,
  CREATE_MATERIAL,
  CREATE_UNIVERSITY,
  DELETE_COURSE,
  DELETE_DEPT,
  DELETE_MATERIAL,
  DELETE_UNIVERSITY,
  GET_ALL_COURSES_BY_SEM_ID,
  GET_ALL_COURSES_BY_SEM_SLUG,
  GET_ALL_DEPTS_BY_UNI_ABBR,
  GET_ALL_MATERIALS_BY_COURSE_ID,
  GET_ALL_MATERIALS_BY_COURSE_SLUG,
  GET_ALL_UNIVERSITY,
  GET_COURSE_BY_ID,
  GET_COURSE_BY_SLUG,
  GET_DEPT,
  GET_DEPTS_BY_UNI_ID,
  GET_LEARNING_STATS,
  GET_MATERIAL,
  GET_SEM_BY_ID,
  GET_SEM_BY_SLUG,
  GET_UNIVERSITY,
  GET_UNIVERSITY_BY_ABBR,
  UPDATE_COURSE,
  UPDATE_DEPT,
  UPDATE_MATERIAL,
  UPDATE_UNIVERSITY,
} from "./learningApiURL";
import {
  ICourse,
  ICreateCourseBody,
  ICreateDepartmentBody,
  ICreateMaterialBody,
  ICreateUniversityBody,
  IDepartment,
  ILearningStats,
  IMaterial,
  ISemester,
  IUniversity,
  IUpdateCourseBody,
  IUpdateDepartmentBody,
  IUpdateMaterialBody,
  IUpdateUniversityBody,
} from "../../../shared/types/learning";

export function getLearningStatsApi() {
  return new Promise<AxiosResponse<ILearningStats>>((resolve, reject) => {
    apiRequest()
      .get(GET_LEARNING_STATS())
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllUniversityApi() {
  return new Promise<AxiosResponse<IUniversity[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_ALL_UNIVERSITY())
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSingleUniversityApi(id: string) {
  return new Promise<AxiosResponse<IUniversity>>((resolve, reject) => {
    apiRequest()
      .get(GET_UNIVERSITY(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUniversityByAbbrApi(abbr: string) {
  return new Promise<AxiosResponse<IUniversity>>((resolve, reject) => {
    apiRequest()
      .get(GET_UNIVERSITY_BY_ABBR(abbr))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createUniversityApi(data: ICreateUniversityBody) {
  return new Promise<AxiosResponse<IUniversity>>((resolve, reject) => {
    apiRequest()
      .post(CREATE_UNIVERSITY(), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateUniversityApi(id: string, data: IUpdateUniversityBody) {
  return new Promise<AxiosResponse<IUniversity>>((resolve, reject) => {
    apiRequest()
      .put(UPDATE_UNIVERSITY(id), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteUniversityApi(id: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    apiRequest()
      .delete(DELETE_UNIVERSITY(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Department API lib
 *
 */
export function getAllDepartmentByUniAbbrApi(uniAbbr: string) {
  return new Promise<AxiosResponse<IDepartment[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_ALL_DEPTS_BY_UNI_ABBR(uniAbbr))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllDeptsByUniIdApi(uniId: string) {
  return new Promise<AxiosResponse<IDepartment[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_DEPTS_BY_UNI_ID(uniId))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSingleDepartmentApi(id: string) {
  return new Promise<AxiosResponse<IDepartment>>((resolve, reject) => {
    apiRequest()
      .get(GET_DEPT(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createDepartmentApi(
  uniId: string,
  data: ICreateDepartmentBody
) {
  return new Promise<AxiosResponse<IDepartment>>((resolve, reject) => {
    apiRequest()
      .post(CREATE_DEPT(uniId), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateDepartmentApi(id: string, data: IUpdateDepartmentBody) {
  return new Promise<AxiosResponse<IDepartment>>((resolve, reject) => {
    apiRequest()
      .put(UPDATE_DEPT(id), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteDepartmentApi(id: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    apiRequest()
      .delete(DELETE_DEPT(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function getSemesterBySlugApi(semSlug: string) {
  return new Promise<AxiosResponse<ISemester>>((resolve, reject) => {
    apiRequest()
      .delete(GET_SEM_BY_SLUG(semSlug))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSemesterByIdApi(semId: string) {
  return new Promise<AxiosResponse<ISemester>>((resolve, reject) => {
    apiRequest()
      .delete(GET_SEM_BY_ID(semId))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Courses API lib
 *
 */
export function getAllCoursesBySemSlugApi(semSlug: string) {
  return new Promise<AxiosResponse<ICourse[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_ALL_COURSES_BY_SEM_SLUG(semSlug))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllCoursesBySemIdApi(semId: string) {
  return new Promise<AxiosResponse<ICourse[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_ALL_COURSES_BY_SEM_ID(semId))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSingleCourseApi(id: string) {
  return new Promise<AxiosResponse<ICourse>>((resolve, reject) => {
    apiRequest()
      .get(GET_COURSE_BY_ID(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSingleCourseBySlugApi(slug: string) {
  return new Promise<AxiosResponse<ICourse>>((resolve, reject) => {
    apiRequest()
      .get(GET_COURSE_BY_SLUG(slug))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createCourseApi(semId: string, data: ICreateCourseBody) {
  return new Promise<AxiosResponse<ICourse>>((resolve, reject) => {
    apiRequest()
      .post(CREATE_COURSE(semId), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateCourseApi(id: string, data: IUpdateCourseBody) {
  return new Promise<AxiosResponse<ICourse>>((resolve, reject) => {
    apiRequest()
      .put(UPDATE_COURSE(id), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteCourseApi(id: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    apiRequest()
      .delete(DELETE_COURSE(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Material API lib
 *
 */
export function getAllMaterialsByCourseSlugApi(cLug: string) {
  return new Promise<AxiosResponse<IMaterial[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_ALL_MATERIALS_BY_COURSE_SLUG(cLug))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllMaterialsByCourseIdApi(cId: string) {
  return new Promise<AxiosResponse<IMaterial[]>>((resolve, reject) => {
    apiRequest()
      .get(GET_ALL_MATERIALS_BY_COURSE_ID(cId))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSingleMaterialApi(id: string) {
  return new Promise<AxiosResponse<IMaterial>>((resolve, reject) => {
    apiRequest()
      .get(GET_MATERIAL(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createMaterialApi(cId: string, data: ICreateMaterialBody) {
  return new Promise<AxiosResponse<IMaterial>>((resolve, reject) => {
    apiRequest()
      .post(CREATE_MATERIAL(cId), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateMaterialApi(id: string, data: IUpdateMaterialBody) {
  return new Promise<AxiosResponse<IMaterial>>((resolve, reject) => {
    apiRequest()
      .put(UPDATE_MATERIAL(id), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteMaterialApi(id: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    apiRequest()
      .delete(DELETE_MATERIAL(id))
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
