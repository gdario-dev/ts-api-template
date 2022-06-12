import { Get, Route, Tags } from "tsoa";
import { AsyncAPIResult, BaseController } from "../../application/api";
import { DomainResult } from "../../core/types";

type Hello = {
	greeting: string;
};

@Route("hellos")
@Tags("Hellos")
export class HelloController extends BaseController {
	@Get("/")
	async getHellos(): AsyncAPIResult<Hello[]> {
		const response: Hello[] = [{ greeting: "hello" }, { greeting: "hola" }];

		return this.resolve(DomainResult.ok(response));
	}
}
