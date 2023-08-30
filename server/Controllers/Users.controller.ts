export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export function RegisterUserService(data: CreateUserDTO) {
  console.log(data);
  return `User with name ${data.username} and email ${data.email} created`;
}
