
var socket_io_1 = require("socket.io");
var Server_1 = require("@ioc:Adonis/Core/Server");

var Ws = /** @class */ (function () {
    function Ws() {
        this.booted = false;
    }
    Ws.prototype.boot = function () {
        /**
         * Ignore multiple calls to the boot method
         */
        if (this.booted) {
            return;
        }
        this.booted = true;
        this.io = new socket_io_1.Server(Server_1.default.instance);
    };
    return Ws;
}());
exports.default = new Ws();
