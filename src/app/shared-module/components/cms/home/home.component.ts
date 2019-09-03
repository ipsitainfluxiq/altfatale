import { Component, NgZone, OnInit, EventEmitter  } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../../../../core-module/services/app.commonservices' ;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { MetaService } from '@ngx-meta/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Commonservices],
})
export class HomeComponent implements OnInit {

    public state: any = [];
    public dataForm: FormGroup;
    private fb;
    private passmatchvalidate;
    public serverurl;
    static invalidemail;
    static blankemail;

    private zone: NgZone;
    public basicOptions: Object;
    public progress: number = 0;
    private response: any = {};
    public uploadedfilesrc: any;
    public imagename: any;

    private zone1: NgZone;
    public basicOptions1: Object;
    public progress1: number = 0;
    private response1: any = {};
    public uploadedfilesrc1: any;
    public imagename1: any;

    private zone2: NgZone;
    public basicOptions2: Object;
    public progress2: number = 0;
    private response2: any = {};
    public uploadedfilesrc2: any;
    public imagename2: any;
    

    private isModalShown: boolean = false;
    private successModal: boolean = false;
    private isModalShownforimage: boolean = false;
    private viewModal: boolean = false;
   /* private isModalShownforimage1: boolean = false;
    private isModalShownforimage2: boolean = false;*/
    private issegmentmodalshown: boolean = false;
    public uploadedfilesource : any = [];
    public imagenamearr : any = [];




    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

  constructor(private readonly meta: MetaService, fb: FormBuilder, private _http: HttpClient, private router: Router, private _commonservices: Commonservices) {
    this.meta.setTitle('Home dynamic');
    this.meta.setTag('og:description', 'This is dynamic decription ');
    this.meta.setTag('og:title', 'This is dynamic title with meta og ');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');
    
    this.getState();

    this.fb = fb;
        this.serverurl = _commonservices.url;
        HomeComponent.blankemail = false;
        HomeComponent.invalidemail = false;
        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                let result1 = res.json();
                for (let i in result1) {
                    this.state[i] = result1[i].name;
                }
            }, error => {
                console.log('Oooops!');
            });





        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            image: [''],
          /*  image1: [''],
            image2: [''],*/
            age: [''],
            phone: [''],
            email: ['', Validators.compose([Validators.required, HomeComponent.validateEmail])],
            city: ['', Validators.required],
            state: ['', Validators.required],
            description: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confpassword: ['', Validators.required],
        }, {validator: this.matchingPasswords('password', 'confpassword')});

        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'uploads',
            filterExtensions: false,
            allowedExtensions: ['jpg', 'png','jpeg']
        };
  }


  onHidden() {
    this.isModalShown = false;
    this.successModal = false;
    this.viewModal = false;
    this.isModalShownforimage = false;
   /* this.isModalShownforimage1 = false;
    this.isModalShownforimage2 = false;*/
    this.issegmentmodalshown = false;
}

handleUpload(data: any, value): void // uploading the images and saving to particular folder
{
    console.log('hi');
    console.log(value);
    console.log(data);
    this.zone.run(() => {
        this.response = data;
        this.progress = data.progress.percent;
        console.log(data.progress.percent);
        if (data.progress.percent == 100) {
            let resp = data.response;
           // alert(5);
            console.log('resp');
            console.log((resp));
            console.log(typeof(resp));
            if (typeof(resp) != 'undefined') {
                let result = (data.response);
                console.log('result');
                console.log(result);
                if (result.length > 1) {
                    let resp1=resp.replace(/"/g, '');
                    console.log('))))))))))))'+resp);
                   // this.uploadedfilesource.push('assets/images/uploads/' + resp1);  // LOCAL
                    this.uploadedfilesource.push('http://altfatale.com/assets/images/uploads/' + resp1);
                    this.imagenamearr.push(resp1);
                        /* // this.dataForm.patchValue({image: result.filename});
                    if (value == 0) {
                        this.isModalShownforimage = true;
                        this.dataForm.patchValue({image: result});
                        this.uploadedfilesrc = 'assets/images/uploads/' + resp.replace(/"/g, '');
                        console.log('upload file location' + this.uploadedfilesrc);
                        // this.imagename = result.filename;
                        this.imagename = result.replace(/"/g, '');
                        console.log('imagename');
                        console.log(this.imagename);
                    }
                    if (value == 1) {
                        this.isModalShownforimage1 = true;
                        this.dataForm.patchValue({image1: result});
                        this.uploadedfilesrc1 = 'assets/images/uploads/' + resp.replace(/"/g, '');
                        console.log('upload file location' + this.uploadedfilesrc1);
                        // this.imagename = result.filename;
                        this.imagename1 = result.replace(/"/g, '');
                        console.log('imagename1');
                        console.log(this.imagename1);
                    }
                    if (value == 2) {
                        this.isModalShownforimage2 = true;
                        this.dataForm.patchValue({image2: result});
                        this.uploadedfilesrc2 = 'assets/images/uploads/' + resp.replace(/"/g, '');
                        console.log('upload file location' + this.uploadedfilesrc2);
                        // this.imagename = result.filename;
                        this.imagename2 = result.replace(/"/g, '');
                        console.log('imagename2');
                        console.log(this.imagename2);
                    }*/
                }
            }
        }
    });
}
/*   handleUpload1(data: any): void // uploading the images and saving to particular folder
{
    console.log('hi');
    console.log(data);
    this.zone.run(() => {
        this.response1 = data;
        this.progress1 = data.progress.percent;
        console.log(data.progress.percent);
        if (data.progress.percent == 100) {
            let resp = data.response;
            console.log('resp');
            console.log((resp));
            console.log(typeof(resp));
            if (typeof(resp) != 'undefined') {
                let result = (data.response);
                console.log('result');
                console.log(result);
                if (result.length > 1) {
                    // this.dataForm.patchValue({image: result.filename});
                    this.dataForm.patchValue({image1: result});
                    this.uploadedfilesrc1 = 'assets/images/uploads/' + resp.replace(/"/g, '');
                    console.log('upload file location' + this.uploadedfilesrc1);
                    // this.imagename = result.filename;
                    this.imagename1 = result.replace(/"/g, '');
                    console.log('imagename1');
                    console.log(this.imagename1);
                }
            }
        }
    });
}
handleUpload2(data: any): void // uploading the images and saving to particular folder
{
    console.log('hi');
    console.log(data);
    this.zone.run(() => {
        this.response2 = data;
        this.progress2 = data.progress.percent;
        console.log(data.progress.percent);
        if (data.progress.percent == 100) {
            let resp = data.response;
            console.log('resp');
            console.log((resp));
            console.log(typeof(resp));
            if (typeof(resp) != 'undefined') {
                let result = (data.response);
                console.log('result');
                console.log(result);
                if (result.length > 1) {
                    // this.dataForm.patchValue({image: result.filename});
                    this.dataForm.patchValue({image2: result});
                    this.uploadedfilesrc2 = 'assets/images/uploads/' + resp.replace(/"/g, '');
                    console.log('upload file location' + this.uploadedfilesrc2);
                    // this.imagename = result.filename;
                    this.imagename2 = result.replace(/"/g, '');
                    console.log('imagename2');
                    console.log(this.imagename2);
                }
            }
        }
    });
}*/
static validateEmail(control: FormControl) {
    HomeComponent.blankemail = false;
    HomeComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
        HomeComponent.blankemail = true;
        return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        HomeComponent.invalidemail = true;
        return {'invalidemail': true};
    }
}

getemail(type: any) {
    //  console.log('t ' + type);
    if (type == 'invalid') {
        return HomeComponent.invalidemail;
    }
    if (type == 'blank') {
        return HomeComponent.blankemail;
    }
}

public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            console.log('mismatch');
            // console.log(this.dataForm.controls['confirmpassword'].valid);
            return {
                mismatchedPasswords: true
            };
        }
        else {
            this.passmatchvalidate = true;
        }
    };
}

getState() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var result = this._http.get('assets/data/state.json').subscribe(res => {
      this.state = res;
      console.log('state');
      console.log(this.state);
  
    });
    return result;
  }

dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
        this.dataForm.controls[x].markAsTouched();
    }
    console.log('inside submit');
    console.log(this.dataForm.valid);
    console.log(this.passmatchvalidate);
    console.log(HomeComponent.invalidemail);
    console.log(HomeComponent.blankemail);
    if (this.dataForm.valid && this.passmatchvalidate && (HomeComponent.invalidemail == false || HomeComponent.blankemail == false)) {
        console.log('inside dataformvalid');
        console.log('formval.image+++++++++++');
       /* console.log(formval.image[0]);
        console.log(formval.image[1]);
        for (let i in formval.image){
            img.push(formval.image[i].name);
        }*/
       /* for (let i in formval.image) {
            var img = JSON.parse(formval.image[i]);
        }*/
       /* console.log('img+++++');
        console.log(img);*/
        // var img = JSON.parse(formval.image);
        // console.log(img);
       /* formval.image = formval.image.replace(/"/g, '');
        formval.image1 = formval.image1.replace(/"/g, '');
        formval.image2 = formval.image2.replace(/"/g, '');*/
        let link = this.serverurl + 'signup';
        let data = {
            firstname: formval.firstname,
            lastname: formval.lastname,
            age: formval.age,
            phone: formval.phone,
            email: formval.email,
            city: formval.city,
            state: formval.state,
            description: formval.description,
            username: formval.username,
            password: formval.password,
            image: formval.image,
           /* image1: formval.image1,
            image2: formval.image2,*/
        };
        this._http.post(link, data)
            .subscribe(res => {
                this.successModal = true;
                this.dataForm.reset();
                this.files = [];
                this.router.navigate(['/']);
            }, error => {
                console.log('Oooops!');
            });
    }
}
deleteimage1(counter: any) {
   // alert(6);
    this.files.splice(counter,1);
   // alert(35);
}

deleteimage(imagename: any, val) {
    console.log(imagename);
    var link = this.serverurl + 'deleteimage';
    var data = {id: '', image: imagename};
    console.log(data);
    this._http.post(link, data)
        .subscribe(res => {
            var result = res.json();
            // var result = res;
            if (result.status == 'success') {
                console.log('Image Deleted');
                console.log(val);
                if (val == 0) {
                    this.uploadedfilesrc = '';
                    this.progress = 0;
                }
                 if (val == 1) {
                    this.uploadedfilesrc1 = '';
                    this.progress1 = 0;
                }
                 if (val == 2) {
                    this.uploadedfilesrc2 = '';
                    this.progress2 = 0;
                }
                // this.is_error = 1;
            }

        }, error => {
            console.log("Oooops!");
        });


}
/*  deleteimage1(imagename: any) {
    console.log(imagename);
    var link = this.serverurl + 'deleteimage';
    var data = {id: '', image: imagename};
    console.log(data);
    this._http.post(link, data)
        .subscribe(res => {
            var result = res.json();
            // var result = res;
            if (result.status == 'success') {
                console.log('Image Deleted');
                this.uploadedfilesrc1 = '';
                this.progress1 = 0;
                // this.is_error = 1;
            }

        }, error => {
            console.log("Oooops!");
        });


}
deleteimage2(imagename: any) {
    console.log(imagename);
    var link = this.serverurl + 'deleteimage';
    var data = {id: '', image: imagename};
    console.log(data);
    this._http.post(link, data)
        .subscribe(res => {
            var result = res.json();
            // var result = res;
            if (result.status == 'success') {
                console.log('Image Deleted');
                this.uploadedfilesrc2 = '';
                this.progress2 = 0;
                // this.is_error = 1;
            }

        }, error => {
            console.log("Oooops!");
        });


}*/
callcomingsoonfunc() {
    this.isModalShown = true;
}
callimagesegment() {
    console.log('callllllllllll');
    this.issegmentmodalshown = true;
}





onUploadOutput(output: UploadOutput): void {
    setTimeout(()=> {
        // alert(8);
        if (output.type === 'allAddedToQueue') { // when all files added in queue
            // uncomment this if you want to auto upload files when added
           // this.disableuploader = 1;
           // console.log('this.disableuploader === before');
           // console.log(this.disableuploader);
            setTimeout(()=> {
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: this.serverurl + 'uploads',
                    // url: 'http://ngx-uploader.com/upload',
                    method: 'POST',
                    // data: {foo: output.file}
                };
                this.uploadInput.emit(event);

            },200);
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added

            setTimeout(()=> {    // <<<---    using ()=> syntax

                console.log('output.file[0].response');
                console.log(output.file.response);
                console.log(output.file);
                console.log(output.file);
                // this.files.push(output.file);

                if(output.file.response!="") {
                    // alert(7);
                    console.log('output.file-------------------');
                    console.log(output.file);
                    console.log(output.file.response);
                    // console.log(output.file[0].response);
                    this.files.push(output.file);
                }
              //  this.disableuploader = 0;
               // console.log('this.disableuploader after');
              //  console.log(this.disableuploader);
                // alert(22);
                // console.log(this.files);
                console.log('this.files');
                console.log(this.files);
                // alert(55);
                //  console.log(output.file[0].response);
            },300);
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            // alert(9);
            console.log(this.files);
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
        /*console.log('files??');
        console.log(this.files);*/
    },200);
}

startUpload(): void {
    const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://ngx-uploader.com/upload',
        method: 'POST',
        data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
}

saveimages() {
this.dataForm.patchValue({image: this.files});
this.issegmentmodalshown = false;
}
viewmodel() {
    this.viewModal = true;
}

}
