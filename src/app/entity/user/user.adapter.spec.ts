import { UserAdapter } from './user-adapter';

describe('User adapter', () => {
  it('userDto To User', () => {
    expect(
      UserAdapter.userDtoToUser({
        _id: 'sdasd2gfjdlgfd',
        email: 'janko@gmail.com',
        firstName: 'Janko',
        lastName: 'Hrasko',
      })
    ).toEqual({
      _id: 'sdasd2gfjdlgfd',
      email: 'janko@gmail.com',
      firstName: 'Janko',
      lastName: 'Hrasko',
    });
  });

  it('user To UserCreateDto', () => {
    expect(
      UserAdapter.userToUserCreateDto({
        email: 'janko@gmail.com',
        firstName: 'Janko',
        lastName: 'Hrasko',
        password: '123abc567K',
      })
    ).toEqual({
      email: 'janko@gmail.com',
      firstName: 'Janko',
      lastName: 'Hrasko',
      password: '123abc567K',
    });
  });
});
