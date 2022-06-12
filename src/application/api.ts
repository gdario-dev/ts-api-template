import { Controller } from "tsoa";
import { DomainError, DomainResult, Optional } from "../core/types";

enum HTTPCode {
	Ok = 200,
	Client = 400,
	Notfound = 404,
	Internal = 500,
	External = 502,
}

// -----------------------------------------------------------------------------
class APIError {
	readonly Error: Optional<string>;

	constructor(err: DomainError) {
		this.Error = err.message;
	}
}

// -----------------------------------------------------------------------------
export type APIResult<T> = T | APIError;
export type AsyncAPIResult<T> = Promise<T | APIError>;

export abstract class BaseController extends Controller {
	protected resolve<T>(result: DomainResult<T>): T | APIError {
		if (result.isSuccess()) {
			return result.value!;
		}

		const type = result.error!.type;

		switch (type) {
			case "Client":
				this.setStatus(HTTPCode.Client);
				break;
			case "External":
				this.setStatus(HTTPCode.External);
				break;
			case "Internal":
				this.setStatus(HTTPCode.Internal);
				break;
			case "Notfound":
				this.setStatus(HTTPCode.Notfound);
				break;

			default:
				this.setStatus(HTTPCode.Internal);
				break;
		}

		return new APIError(result.error!);
	}
}
