import { Injector } from '@angular/core';
export class AppConfig {
    
    public static AppName = "My Angular 7 Application";
    public static CreatedBy = "Arup Saha";  
    public static AppVersion = "1.1.0";

    // Injector to create instance of a class without passing in constructor
    public static InjectorInstance:Injector;
 }
