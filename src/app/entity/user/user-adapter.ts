import { User } from './user';
import { UserCreateDto } from './user-create-dto';
import { UserDto } from './user-dto';

export class UserAdapter {
  static userDtoToUser(userDto: UserDto): User {
    return { ...userDto };
  }

  static userToUserCreateDto(user: User): UserCreateDto {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    };
  }
}
