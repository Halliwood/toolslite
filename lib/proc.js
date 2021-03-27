"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcTool = void 0;
var child_process_1 = require("child_process");
var ProcTool = /** @class */ (function () {
    function ProcTool(silent) {
        if (silent === void 0) { silent = false; }
        this.silent = silent;
        this.isRuning = false;
    }
    ProcTool.prototype.spawnPromise = function (command, params, options) {
        var _this = this;
        this.text = '';
        return new Promise(function (resolve, reject) {
            _this.isRuning = true;
            var proc = child_process_1.spawn(command, params, options);
            // 执行成功
            proc.stdout.on('data', function (data) {
                if (!_this.silent)
                    console.log(String(data));
                _this.text += data;
            });
            //执行失败
            proc.stderr.on('data', function (data) {
                if (!_this.silent)
                    console.error(String(data));
                _this.err = new Error(String(data));
            });
            // 进程错误
            proc.on('error', function (error) {
                if (!_this.silent)
                    console.error(error);
                _this.isRuning = false;
                reject(error);
            });
            // 进程关闭
            proc.on('close', function (code) {
                console.log('on proc close');
                _this.isRuning = false;
                if (code == 0) {
                    resolve(_this.text || '');
                }
                else {
                    reject(new Error("proc exit with code: " + code));
                }
            });
        });
    };
    return ProcTool;
}());
exports.ProcTool = ProcTool;
