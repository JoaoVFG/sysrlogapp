import { Injectable } from "@angular/core";
import { mapConfigService } from '../Service/mapconfig.service'
import { AES } from 'crypto-js'; // For AES encryption/decryption
import { enc } from 'crypto-js'; // For characters encodages types (Utf-8, latin1...)

@Injectable()
export class cryptService{

	public cryptValue : string;
	constructor(private mapConfig: mapConfigService){
	}

	encrypt(dataToEncrypt : string) : string{
		let secret = this.retriveSecret();
		let encrypted = AES.encrypt(dataToEncrypt, secret);
		return encrypted.toString();
	}

	decrypt(dataToDecrypt : string) : string{
		this.initializeCryptValue();
		let secret = this.retriveSecret();
		let bytes  = AES.decrypt(dataToDecrypt, secret.toString());
		let decrypted = bytes.toString(enc.Utf8);
		return decrypted;
	}

	initializeCryptValue(){
		this.mapConfig.findCrypto()
			.subscribe(response =>{
				localStorage.setItem('SECRET',response.body.toString());
			})
	}

	retriveSecret(): string{
        return localStorage.getItem('SECRET');
    }
	

}