import { Injectable } from "@angular/core";
import { mapConfigService } from '../Service/mapconfig.service'
import { AES } from 'crypto-js'; // For AES encryption/decryption
import { enc } from 'crypto-js'; // For characters encodages types (Utf-8, latin1...)

@Injectable()
export class cryptService{

	public cryptValue : string;
	constructor(/**private mapConfig: mapConfigService**/){
	}

	encrypt(dataToEncrypt : string) : string{
		this.initializeCryptValue();
		let secret = this.retriveSecret();
		let encrypted = AES.encrypt(dataToEncrypt, secret);
		localStorage.removeItem('SECRET');
		return encrypted.toString();
	}

	decrypt(dataToDecrypt : string) : string{
		this.initializeCryptValue();
		let secret = this.retriveSecret();
		let bytes  = AES.decrypt(dataToDecrypt, secret.toString());
		let decrypted = bytes.toString(enc.Utf8);
		localStorage.removeItem('SECRET');
		return decrypted;
	}
	
	initializeCryptValue(){
		/**this.mapConfig.findCrypto()
			.subscribe(response =>{
				console.log(response.body.toString());
				
				localStorage.setItem('SECRET',response.body.toString());
			})**/
		localStorage.setItem('SECRET','DFa3d2f13we5f1335!*¨(@¨!&@(*');
	}

	retriveSecret(): string{
		return localStorage.getItem('SECRET');
		//return 'TESTESEGREDO';
    }
	

}