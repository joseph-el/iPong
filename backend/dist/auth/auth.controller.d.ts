import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    fortyTwoAuth(): void;
    fortyTwoCallback(res: any): void;
    login(res: Response, dto: AuthDto): Promise<void>;
    signup(res: Response, dto: CreateUserDto): Promise<Tokens>;
    refresh(res: Response, refreshToken: string, userId: string): Promise<{
        message: string;
    }>;
    logout(userId: string, res: Response): Promise<void>;
}
