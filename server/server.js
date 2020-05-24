"use strict";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); else next();
});

var yhms = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'aaa', password: '456789' },
];

var USERS = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'aaa', password: '456789' },
];

var chanpins = [
    { id: '01', userName: '狗屎', price: '35元' },
    { id: '02', userName: '狗', price: '2000元' },
];

//登录验证
app.post('/yhms', function (req, resp) {
    let founded = false;
    for (let yhm of yhms) {
        if (yhm.userName === req.body.userName) {
            if (yhm.password === req.body.password) {
                founded = true;
                break;
            } break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


app.get('/hello', function (req, resp) {
    resp.send('哈哈哈');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/chanpins', function (req, resp) {
    resp.send(chanpins);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

app.get('/chanpins/:id', function (req, resp) {
    console.log(req.params);
    console.log('abc');
    const id = req.params.id;
    for (let chanpin of chanpins) {
        if (chanpin.id === id) {
            console.log('aaa');
            resp.send([chanpin]);
        }
    }
    console.log('123');
    resp.end();
});

//添加用户
app.post('/user', function (req, resp) {
    //json
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//添加产品
app.post('/chanpin', function (req, resp) {
    //json
    console.log('aaa');
    chanpins.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//修改用户
app.put('/user', function (req, resp) {
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//修改产品
app.put('/chanpin', function (req, resp) {
    //json
    let founded = false;
    for (let chanpin of chanpins) {
        if (chanpin.id === req.body.id) {
            chanpin.userName = req.body.userName;
            chanpin.price = req.body.price;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//删除用户
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});



//删除产品
app.delete('/chanpin/:id', function (req, resp) {
    console.log('aaa');
    let founded = false;
    let index = 0;
    for (let chanpin of chanpins) {
        if (chanpin.id === req.params.id) {
            chanpins.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

app.listen(8080, function () {
    console.log('服务器在8080端口启动!');
});

