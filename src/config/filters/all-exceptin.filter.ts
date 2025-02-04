
// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   Logger,
//   HttpStatus,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   private readonly logger = new Logger(AllExceptionsFilter.name);

//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();
//     const exceptionResponse = exception.getResponse();

//     let errorResponse = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: ctx.getRequest().url,
//     };

//     if (typeof exceptionResponse === 'object') {
//       const responseObject = exceptionResponse as Record<string, string>;
//       if (Array.isArray(responseObject.message)) {
//         errorResponse['message'] = responseObject.message[0];
//       } else {
//         errorResponse = {
//           ...errorResponse,
//           ...responseObject,
//         };
//       }
//     } else {
//       errorResponse['message'] = exceptionResponse;
//     }

//     this.logger.error(
//       `HTTP Status: ${status} Error Message: ${JSON.stringify(errorResponse)}`,
//     );
//     response.status(status).json(errorResponse);
//   }
// }

// export class AuthenticationError extends HttpException {
//   constructor(message: string, description: string) {
//     super(
//       {
//         statusCode: HttpStatus.UNAUTHORIZED,
//         message,
//         description,
//         errorType: 'AuthenticationError',
//       },
//       HttpStatus.UNAUTHORIZED,
//     );
//   }
// }

// export class ValidationError extends HttpException {
//   constructor(message: string, description: string) {
//     super(
//       {
//         statusCode: HttpStatus.BAD_REQUEST,
//         message,
//         description,
//         errorType: 'ValidationError',
//       },
//       HttpStatus.BAD_REQUEST,
//     );
//   }
// }

// // Optional: Add base error class to reduce duplication
// abstract class BaseError extends HttpException {
//   constructor(
//     message: string,
//     description: string,
//     status: HttpStatus,
//     errorType: string,
//   ) {
//     super(
//       {
//         statusCode: status,
//         message,
//         description,
//         errorType,
//       },
//       status,
//     );
//   }
// }

// export class NotFoundError extends BaseError {
//   constructor(message: string, description: string) {
//     super(message, description, HttpStatus.NOT_FOUND, 'NotFoundError');
//   }
// }

// export class ForbiddenError extends BaseError {
//   constructor(message: string, description: string) {
//     super(message, description, HttpStatus.FORBIDDEN, 'ForbiddenError');
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'UnknownError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        const responseObject = exceptionResponse as Record<string, any>;
        message = responseObject.message || message;
        errorType = responseObject.errorType || 'HttpException';
      } else {
        message = exceptionResponse as string;
      }
    } else if (exception.code === '23505') {
      status = HttpStatus.BAD_REQUEST;
      message = 'A user with this email already exists';
      errorType = 'DatabaseError';
    } else if (exception.code) {

      message = exception.message || message;
      errorType = 'DatabaseError';
    }

    const errorResponse = {
      statusCode: status,
      errorType,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error(
      `[${errorType}] ${request.method} ${request.url} - ${JSON.stringify(errorResponse)}`,
    );

    response.status(status).json(errorResponse);
  }
}


abstract class BaseHttpError extends HttpException {
  constructor(
    message: string,
    description: string,
    status: HttpStatus,
    errorType: string,
  ) {
    super(
      {
        statusCode: status,
        message,
        description,
        errorType,
      },
      status,
    );
  }
}

export class AuthenticationError extends BaseHttpError {
  constructor(message: string, description: string = 'Unauthorized access') {
    super(message, description, HttpStatus.UNAUTHORIZED, 'AuthenticationError');
  }
}

export class ValidationError extends BaseHttpError {
  constructor(message: string, description: string = 'Invalid data') {
    super(message, description, HttpStatus.BAD_REQUEST, 'ValidationError');
  }
}

export class NotFoundError extends BaseHttpError {
  constructor(message: string, description: string = 'Resource not found') {
    super(message, description, HttpStatus.NOT_FOUND, 'NotFoundError');
  }
}

export class ForbiddenError extends BaseHttpError {
  constructor(message: string, description: string = 'Access denied') {
    super(message, description, HttpStatus.FORBIDDEN, 'ForbiddenError');
  }
}
