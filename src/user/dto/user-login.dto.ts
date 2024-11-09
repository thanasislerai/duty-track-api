import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty({ message: "Παρακαλούμε εισάγετε το όνομα χρήστη" })
    @IsString({ message: "Μη έγκυρο όνομα χρήστη" })
    userName: string;

    @IsNotEmpty({ message: "Παρακαλούμε εισάγετε κωδικό" })
    @IsString({ message: "Μη έγκυρος κωδικός" })
    password: string;
}
