function RFILE_f() {

    RFILE_f.prototype.define = function RFILE_f() {
        this.tmask1 = [];
        this.out = 1;
        this.nout = this.out;
        this.frmt = "(7(e10.3,1x))";
        this.fname = "foo";
        this.lunit = 0;
        this.N = 2;
        this.rpar = [];
        this.tmask = 0;
        this.outmask = 1;

        var ipar = new ScilabDouble([this.fname.length], [this.frmt.length], [0], [this.N], ..._str2code(this.fname), ..._str2code(this.frmt), [this.tmask], [this.outmask]);

        var dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros((this.nout) * this.N, 1));

        var model = scicos_model();
        model.sim = new ScilabString(["readf"]);
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = dstate;
        model.ipar = ipar;
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp([])], [sci2exp(this.outmask)], [this.fname], [this.frmt], [this.N], [this.out]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RFILE_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RFILE_f.prototype.details = function RFILE_f() {
        return this.x;
    }
    RFILE_f.prototype.get = function RFILE_f() {
        if(this.fname1 == undefined || this.fname1 == null)
            this.fname1 = this.fname
        if(this.frmt1 == undefined || this.frmt1 == null)
            this.frmt1 = this.frmt

        var options = {
            tmask1:["Time Record Selection",this.tmask1],
            outmask:["Outputs Record Selection",this.outmask],
            fname1:["Input File Name",this.fname1],
            frmt1:["Input Format",this.frmt1],
            N:["Buffer Size",this.N],
        }
        return options
    }
    RFILE_f.prototype.set = function RFILE_f() {
        var temp_tmask1 = arguments[0]["tmask1"];
        var temp_outmask = arguments[0]["outmask"];
        var tmask1_1 = inverse(temp_tmask1);
        var outmask_1 = inverse(temp_outmask);
        this.fname1 = arguments[0]["fname1"];
        this.frmt1 = arguments[0]["frmt1"];
        this.N = parseFloat(arguments[0]["N"]);

        this.nout = size(outmask_1,"*")
        if(size(tmask1_1,1) > 1){
            alert("Wrong value for 'Time Record Selection' parameter: "+temp_tmask1+"\nEmpty matrix or scalar expected.");
            throw "incorrect";
        }else if( size(tmask1_1,"*") != 0 && tmask1_1 < 1){
            alert("Wrong value for 'Time Record Selection' parameter: "+temp_tmask1+"\nStrictly positive integer expected.");
            throw "incorrect";
        }else if((this.lunit > 0) && (size(this.frmt,1) != size(this.frmt1,1))){
            alert("Simulation running !!! You cannot switch <br />between formatted and unformatted"+"\nEnd current simulation first.");
            throw "incorrect";
        }else if((this.lunit > 0) && (this.fname1 != this.fname)){
            alert("Simulation running !!! You cannot modify ''Input File Name''"+"\nEnd current simulation first.");
            throw "incorrect";
        }else if((this.lunit > 0) && (size(tmask1_1,"*") != size(tmask1_1,"*"))){
            alert("Simulation running !!! You cannot modify ''Time Record Selection''"+"\nEnd current simulation first.");
            throw "incorrect";
        }else if(this.fname1 == ""){
            alert("Wrong value for 'Input File Name' parameter: "+this.fname1+"\nYou must provide a filename.");
            throw "incorrect";
        }
        // Simple check for including of the format's string  in parenthesis
        //else if((this.frmt1!="")&&(this.frmt1.substr(0,1)!="(")||(this.frmt1.substr(this.frmt1.length-1,this.frmt1.length)!=")")){
        //  alert("Wrong format for 'Input Format' parameter: "+this.frmt1+"\nYou must enclose the format''s string between parentheses.");
        //  RFILE_f.get();
        //}
        else if(this.N < 2){
            alert("Wrong value for 'Buffer Size' parameter: "+this.N+"\nBuffer size must be at least 2.");
            throw "incorrect";
        }else if(this.nout == 0){
            alert("Wrong value for 'Outputs Record Selection' parameter: "+this.nout+"\nYou must read at least one field in record.");
            throw "incorrect";
        }else if(outmask_1 < 1){
            alert("Wrong value for 'Outputs Record Selection' parameter: "+temp_outmask+"\nStrictly positive indexes expected.");
            throw "incorrect";
        }
        if(tmask1_1.length == 0){
            this.ievt = 0;
            this.cout = [];
            tmask1_1 = [[0]];
        }else{
            this.ievt = 1;
            this.cout = 1;
        }
        this.tmask1 = temp_tmask1;
        this.outmask = temp_outmask;
        var io = check_io(this.x.model,this.x.graphics,[],[this.nout],[1],this.cout);
        if(this.ievt == 0){
            this.x.model.firing = new ScilabDouble();
        }else{
            this.x.model.firing = new ScilabDouble([0]);
        }
        var ipar = new ScilabDouble([this.fname1.length], [this.frmt1.length], [this.ievt], [this.N], ..._str2code(this.fname1), ..._str2code(this.frmt1), ...tmask1_1, ...outmask_1);
        this.value = zeros(this.nout+this.ievt,1);
        for (var i = this.value.length - 1; i >= 0; i--) {
            this.value[i][0] = this.N*this.value[i];
        }
        var dstate = new ScilabDouble([-1],[-1],[this.lunit],...this.value,[1]);
        this.x.model.dstate = dstate;
        this.x.model.ipar = ipar;

        var exprs = new ScilabString([this.tmask1],[this.outmask],[this.fname1],[this.frmt1],[this.N]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    RFILE_f.prototype.get_popup_title = function RFILE_f() {
        var set_param_popup_title = "Set RFILE_f block parameters<br><br>Read is done on: <br>- A binary file if no format given<br>- A formatted text file if a  format (fortran type) is given";
        return set_param_popup_title
    }
    RFILE_f.prototype.getDimensionForDisplay = function RFILE_f(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
