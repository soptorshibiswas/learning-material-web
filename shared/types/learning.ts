import { ISemesterModel } from "../../server/database/models/learning/Department";

export const COURSE_TYPE = {
  THEORY: "THEORY" as const,
  SESSIONAL: "SESSIONAL" as const,
  MIXED: "MIXED" as const,
};
export const courseTypes = Object.values(COURSE_TYPE);
export type TCourseType = typeof courseTypes[number];

export const MATERIAL_TYPE = {
  refBook: "refBook" as const,
  question: "question" as const,
  lectureNote: "lectureNote" as const,
};
export const materialTypes = Object.values(MATERIAL_TYPE);
export type TMaterialType = typeof materialTypes[number];

export const materialTypeObj = {
  refBook: "Reference book",
  question: "Question",
  lectureNote: "Lecture note",
};

/**
 * University types
 */
export interface ICreateUniversityBody {
  name: string;
  abbr: string;
  image: string;
}
export interface IUpdateUniversityBody {
  name?: string;
  abbr?: string;
  image?: string;
}
export interface IUniversity extends ICreateUniversityBody {
  _id: string;
  totalDepartments: number;
}

/**
 * Department types
 */
export interface ISemester extends ISemesterModel {
  _id: string;
}

export interface ICreateSemesterBody {
  _id?: string;
  name: string;
  hasMaterial?: boolean;
}
export interface ICreateDepartmentBody {
  name: string;
  abbr: string;
  totalSemesters: number;
  semesters: ICreateSemesterBody[];
}
export interface IUpdateDepartmentBody {
  name?: string;
  abbr?: string;
  totalSemesters?: number;
  semesters?: ISemester[] | ICreateSemesterBody[];
}
export interface IDepartment {
  _id: string;
  name: string;
  abbr: string;
  slug: string;
  universityId: string;
  totalSemesters: number;
  semesters: ISemester[] | ICreateSemesterBody[];
}

/**
 * Course types
 */
export interface ICreateCourseBody {
  name: string;
  type: TCourseType;
  code: string;
}
export interface IUpdateCourseBody {
  name?: string;
  type?: TCourseType;
  code?: string;
}
export interface ICourse extends ICreateCourseBody {
  _id: string;
  slug: string;
  semesterId: string;
  departmentId: string;
  universityId: string;
}

/**
 * Material types
 */

export interface ICreateMaterialBody {
  type: TMaterialType;
  file: string;
  name?: string;
  sessionYear?: string;
  author?: string;
  courseCode?: string;
}

export interface IUpdateMaterialBody {
  type?: TMaterialType;
  file?: string;
  name?: string;
  sessionYear?: string;
  author?: string;
  courseCode?: string;
}

export interface IMaterial extends ICreateMaterialBody {
  _id: string;
  courseId: string;
  departmentId: string;
  universityId: string;
}

export interface ILearningStats {
  totalUniversity: number;
  totalResources: number;
  totalQnA: number;
}
