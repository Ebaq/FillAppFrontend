export namespace main {
	
	export class ProgramResponse {
	    Products: string[];
	    GuardProducts: string[];
	
	    static createFrom(source: any = {}) {
	        return new ProgramResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Products = source["Products"];
	        this.GuardProducts = source["GuardProducts"];
	    }
	}

}

