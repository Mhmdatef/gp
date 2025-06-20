import axiosInstance from "../api/axiosInstance";
import { Student } from "../interfaces/Student.interface";
import { showError, showSuccess } from "../services/toastService";

export const loginUser = (
  type: string,
  data: { email: string; pass: string },
  callback: (studentData: Student) => void
): void => {
  const url = type === "student" ? "api/v1/students/login" : `api/v1/${type}/login`;
  axiosInstance
    .post(url, {
      email: data.email,
      password: data.pass,
    })
    .then((res) => {
      const _token = res.data.data.token; // استخدمت _token لتجنب تحذير unused variable
      localStorage.setItem("token", _token);
      showSuccess("Login is successful");
      callback(res.data.data);
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        showError(err.message);
        console.error(err);
      } else {
        showError("Unknown error");
        console.error(err);
      }
    });
};

export const getAllStudents = async (url: string): Promise<Student[]> => {
  try {
    const res = await axiosInstance.get(url);
    return res.data.data.students;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw err;
    }
    throw new Error("Unknown error");
  }
};

export const getOneStudent = async (url: string): Promise<Student | undefined> => {
  try {
    const res = await axiosInstance.get(url);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      showError(err.message);
      console.error(err);
    } else {
      showError("Unknown error");
      console.error(err);
    }
  }
};

export const editStudent = async (url: string, formData: unknown): Promise<Student | undefined> => {
  try {
    const res = await axiosInstance.patch(url, formData);
    return res.data.data.student;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw err;
    }
    throw new Error("Unknown error");
  }
};

export const deleteStudent = async (url: string): Promise<unknown> => {
  try {
    const res = await axiosInstance.delete(url);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      showError(err.message);
      console.error(err);
    } else {
      showError("Unknown error");
      console.error(err);
    }
  }
};

export const uploadStudents = async (url: string, formData: unknown): Promise<void> => {
  try {
    await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Unknown error");
  }
};

export const addStudent = async (url: string, student: unknown): Promise<Student | undefined> => {
  try {
    const res = await axiosInstance.post(url, student);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw err;
    }
    throw new Error("Unknown error");
  }
};
