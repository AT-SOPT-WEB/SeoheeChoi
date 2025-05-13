import instance from "./axiosInstance";

export const signup = (data: { loginId: string; password: string; nickname: string }) =>
  instance.post("/auth/signup", data);

export const signin = (data: { loginId: string; password: string }) =>
  instance.post("/auth/signin", data);

export const getMyInfo = () => instance.get("/users/me");

export const getUsers = (nickname?: string) =>
  instance.get("/users", { params: nickname ? { keyword: nickname } : {} });

export const updateNickname = (nickname: string) =>
  instance.patch("/users", { nickname });
