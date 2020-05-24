import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chanpin } from 'src/chanpin';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  price: AbstractControl;
  chanpins$: Observable<Chanpin>;
  baseUrl = 'http://127.0.0.1:8080/';
  title: any;
  currentchanpins: Chanpin;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'price': [''],
      'id': [''],
    });
    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.price = this.myForm.controls['price'];
  }
  /* 页面初始化*/
  ngOnInit(): void {
    this.chanpins$ = <Observable<Chanpin>>this.httpClient.get(this.baseUrl + 'chanpins');
  }

  search() {
    if (this.id.value) {
      this.chanpins$ = <Observable<Chanpin>>this.httpClient.get(this.baseUrl + 'chanpins/' + this.id.value);
    } else {
      this.chanpins$ = <Observable<Chanpin>>this.httpClient.get(this.baseUrl + 'chanpins');
    }
  }

  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'chanpin', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功！');
        }
      }
    );

  }

  select(u: Chanpin) {
    this.currentchanpins = u;
    this.myForm.setValue(this.currentchanpins);
  }
  delete() {
    if (!this.currentchanpins) {
      alert('必须选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'chanpin/' + this.currentchanpins.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
          }
        }
      )
    }
  }

  update() {
    if (!this.currentchanpins) {
      alert('必须选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'chanpin', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
          }
        }
      )
    }
  }

}
