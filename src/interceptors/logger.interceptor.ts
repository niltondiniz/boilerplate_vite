import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    
    constructor(@Inject('winston') private logger:Logger){
        
    }
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        this.log(context.switchToHttp().getRequest());
        return next.handle();

    }
    log(req) {
       
        const body = { ...req.body };
        this.logger.info({
            quando: new Date().toISOString,
            metodo: req.method,
            rota: req.route.path,
            dados: {
                body: body,
                query: req.query,
                params: req.params,
            },
            ipOrigem: req.ip
        })

    }



    
}