import Strategy from 'passport-42';
import Profile from 'passport-42';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
declare const FortyTwoStrategy_base: new (...args: any[]) => Strategy;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private readonly User;
    private readonly AuthService;
    constructor(User: UsersService, AuthService: AuthService);
    validate(req: any, accessToken: string, refreshToken: string, profile: Profile, cb: Function): Promise<any>;
}
export {};
