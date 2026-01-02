import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: '1', name: 'John Doe', email: 'john@example.com' },
  ];

  async getUserById(id: string | number) {
    return this.users.find((user) => user.id == id);
  }
}
