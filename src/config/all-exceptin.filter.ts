import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage: string;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      // Extract the message
      if (typeof exceptionResponse === 'string') {
        errorMessage = exceptionResponse; // Direct message
      } else if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        errorMessage = Array.isArray(exceptionResponse['message'])
          ? exceptionResponse['message'].join(', ') // Join array messages
          : (exceptionResponse['message'] as string); // Assert as string
      } else {
        errorMessage = 'An error occurred'; // Fallback message
      }
    } else {
      errorMessage = 'Internal server error'; // Generic error message for unexpected errors
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
    });

    // Optionally log the error for debugging
    console.error('Error:', exception);
  }
}
