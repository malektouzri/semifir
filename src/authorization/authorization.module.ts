import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthorizationGuard } from './authorization.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthorizationGuard],
  exports: [PassportModule],
})

export class AuthorizationModule {}
