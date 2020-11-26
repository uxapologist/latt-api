import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** @todo remove this decorator if it won't be needed further */
/** Pluck specific property (User) from request object */
export const User = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return data ? req.user[data] : req.user;
});
