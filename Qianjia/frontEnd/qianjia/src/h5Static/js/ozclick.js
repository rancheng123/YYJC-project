(function () {
    var _oziframe = "0";
    var _oz_updatetail = "0";
    var _ozclick = "0";
    var _ozrec = "ozrec";
    var k = undefined;
    k = {
        fL: function () {
            this.bw = "2669.oadz.com";
            this.sz = "fac2.oadz.com";
            this.bg = "s.oadz.com";
            this.dr = "cnt;C1;2669;.;/Sr/sBNqqyDdbNE///KYRhrSX3A=;";
            this.dE = "jcnt;C1;2669;.;THlFCtTH0MJ3lXRbKmtIuAEiaIs=;";
            this.cq = "fcnt;C1;2669;.;JGiZYpRN5czLKYMLhfkoS0n3+Sk=;";
            this.dJ = "event;E1;2669;.;pBrffdyjlOezW2GugMJfQRGi52o=;";
            this.fv = "1120C";
            this.ek = "1120C";
            this.cK = 50;
            this.L = window;
            this.cO = this.L.top;
            this.di = this.L.screen;
            this.aR = this.L.document;
            this.df = navigator;
            this.eC = (this.df.appName == 'Microsoft Internet Explorer');
            this.dn = new Image();
            this.cB = new Image();
            this.dh = new Image();
            this.dR = new Image();
            this.aJ = this.dr.split(";")[2];
            this.be = undefined;
            this.ab = undefined;
            this.bK = undefined;
            this.bN = undefined;
            this.H = undefined;
            this.bC = undefined;
            this.ah = undefined;
            this.by = undefined;
            this.av = undefined;
            this.aY = undefined;
            this.aW = undefined;
            this.C = 0;
            this.ad = 0;
            this.aM = 768;
            this.aQ = 512;
            this.fj = 1536;
            this.cD = 1024;
            this.fN = 2048;
            this.dj = 3;
            this.az = undefined;
            this.cV = "\x49\x4e\x50\x55\x54";
            this.ds = "\x62\x75\x74\x74\x6f\x6e";
            this.dN = "\x69\x6d\x61\x67\x65";
            this.dv = "\x73\x75\x62\x6d\x69\x74";
            this.ct = "\x62\x6f\x64\x79";
            this.dc = "\x68\x74\x6d\x6c";
            this.eg = "\x46\x4c\x41\x53\x48";
            this.bO = "\x4f\x5a\x5f\x30\x61\x5f" + this.aJ;
            this.aq = "\x4f\x5a\x5f\x31\x55\x5f" + this.aJ;
            this.bQ = "\x4f\x5a\x5f\x31\x59\x5f" + this.aJ;
            this.dM = "\x4f\x5a\x5f\x31\x4b\x5f" + this.aJ;
            this.cC = "\x4f\x5a\x5f\x31\x53\x5f" + this.aJ;
            this.af = "\x4f\x5a\x5f\x53\x49\x5f" + this.aJ;
            this.ba = "\x4f\x5a\x5f\x52\x55\x5f" + this.aJ;
        }, dH: function () {
            if (!this.bK) {
                if (this.F(0).indexOf("https") == 0) {
                    this.bK = "https://" + this.bg + "/" + this.cq;
                } else {
                    this.bK = "http://" + this.sz + "/" + this.cq;
                }
            }
            return this.bK;
        }, cg: function () {
            if (!this.be) {
                if (this.F(0).indexOf("https") == 0) {
                    this.be = "https://" + this.bg + "/" + this.dr;
                } else {
                    this.be = "http://" + this.bw + "/" + this.dr;
                }
            }
            return this.be;
        }, aZ: function () {
            if (!this.ab) {
                if (this.F(0).indexOf("https") == 0) {
                    this.ab = "https://" + this.bg + "/" + this.dE;
                } else {
                    this.ab = "http://" + this.bw + "/" + this.dE;
                }
            }
            return this.ab;
        }, dI: function () {
            if (!this.bN) {
                if (this.F(0).indexOf("https") == 0) {
                    this.bN = "https://" + this.bg + "/" + this.dJ;
                } else {
                    this.bN = "http://" + this.bw + "/" + this.dJ;
                }
            }
            return this.bN;
        }, bx: function (bU, aF, bb, aY) {
            var R = "";
            if (bb && bb > 0) R = bU + "=" + aF + ";expires=" + bb.toGMTString() + ";path=/;domain=" + aY; else R = bU + "=" + aF + ";path=/;domain=" + aY;
            this.aR.cookie = R;
        }, bM: function (bU) {
            var R = this.aR.cookie, da, ac, dO = R.indexOf(bU + "=");
            if (dO != -1) {
                da = dO + bU.length + 1;
                ac = R.indexOf(";", da);
                if (ac == -1) {
                    ac = R.length;
                }
                return R.substring(da, ac);
            }
            return null;
        }, aj: function () {
            var aT = undefined;
            if (!this.aY) {
                this.aY = this.aR.domain;
                if (this.aY.indexOf(".") > -1) {
                    var O = this.aY.split(".");
                    this.aY = O[O.length - 2] + "." + O[O.length - 1];
                    if (O.length > 2 && O[O.length - 3] != "www") {
                        aT = O[O.length - 2];
                        if (aT.length <= 2 || (aT == "com" || aT == "edu" || aT == "gov" || aT == "net" || aT == "org" || aT == "mil")) {
                            this.aY = O[O.length - 3] + "." + aT + "." + O[O.length - 1];
                        }
                    }
                }
            }
            return this.aY;
        }, F: function (bp) {
            var bH = this.aQ;
            if (typeof(bp) != "undefined" && bp == 1) {
                bH = this.cD;
            }
            var j = "";
            try {
                try {
                    j = this.cO.location.href;
                } catch (ex) {
                    j = this.L.location.href;
                }
            } catch (ex) {
            }
            if (!j) {
                j = "-";
            }
            if (j.length > bH) {
                j = j.substring(0, bH);
            }
            j = escape(j);
            return j;
        }, dq: function (bp) {
            var bH = this.aQ;
            if (typeof(bp) != "undefined" && bp == 1) {
                bH = this.cD;
            }
            var bc = "";
            try {
                bc = this.L.location.href;
            } catch (ex) {
            }
            if (!bc) {
                bc = "-";
            }
            if (bc.length > bH) {
                bc = bc.substring(0, bH);
            }
            bc = escape(bc);
            return bc;
        }, ai: function (bp) {
            var cs = this.fj;
            if (typeof(bp) != "undefined" && bp == 1) {
                cs = this.fN;
            }
            if (!this.H) {
                try {
                    try {
                        this.H = this.cO.document.referrer;
                    } catch (ex) {
                        this.H = this.aR.referrer;
                    }
                    if (!this.H) {
                        this.H = this.cO.opener.location.href;
                    }
                } catch (ex) {
                }
                if (!this.H) {
                    this.H = "-";
                }
                if (this.H.length > cs) {
                    this.H = this.H.substring(0, cs);
                }
                this.H = escape(this.H);
            }
            return this.H;
        }, cf: function (J, dw) {
            try {
                if (J && dw && J.getAttribute(dw)) {
                    return J.getAttribute(dw).toString();
                }
            } catch (ex) {
            }
            return null;
        }, aO: function (J) {
            if (J && J.name) {
                return J.name.toString();
            } else if (this.cf(J, "name")) {
                return this.cf(J, "name");
            } else if (J && J.id) {
                return J.id.toString();
            } else {
                return "-";
            }
        }, ea: function (J) {
            var G = 1, aI = 0;
            while (J && G <= 50) {
                J = J.parentNode;
                G++;
                if (J && J.tagName == "DIV") {
                    var bm = this.aO(J);
                    if (bm && bm.indexOf("__") == 0 && bm.length > 2) {
                        aI = 1;
                        break;
                    }
                }
            }
            if (aI == 1) {
                return J;
            } else {
                return null;
            }
        }, cG: function (J, db) {
            if (!J.onclick) {
                J.onclick = db;
            } else {
                if (this.eC) {
                    J.attachEvent("onclick", db);
                } else {
                    J.addEventListener("click", db, false);
                }
            }
        }, fu: function () {
            var G = 0;
            if (typeof(k.L.frames) != "undefined" && k.L.frames) {
                for (G = 0; G < k.L.frames.length; G++) {
                    try {
                        k.cG(k.L.frames[G].document, k.bf);
                    } catch (ex) {
                    }
                }
            }
            if (k.L["__99_A6D_pageonload"]) {
                k.L["__99_A6D_pageonload"]();
            }
        }, cT: function (J) {
            var G = 1;
            while (J && J.tagName != "A" && J.tagName != "AREA" && G <= 10) {
                J = J.parentNode;
                G++;
            }
            if (J && (J.tagName == "A" || J.tagName == "AREA")) {
                return J;
            } else {
                return null;
            }
        }, fJ: function (J) {
            var G = 1;
            var aL = undefined;
            if (_ozclick == 1) {
                var K = this.aO(J);
                while (J && G <= 5 && !(K && K.indexOf("__") == 0 && K.length > 2 && J.onclick)) {
                    J = J.parentNode;
                    K = this.aO(J);
                    G++;
                }
                if (J && J.onclick && K && K.indexOf("__") == 0 && K.length > 2) {
                    return J;
                }
            } else {
                if (J && J.tagName) {
                    aL = J.tagName.toLowerCase();
                }
                while (J && !J.onclick && G <= 5 && aL != this.ct && aL != this.dc) {
                    if (J.parentNode && J.parentNode.tagName) {
                        J = J.parentNode;
                        aL = J.tagName.toLowerCase();
                        G++;
                    } else {
                        return null;
                    }
                }
                if (J && J.onclick && aL != this.ct && aL != this.dc) {
                    return J;
                }
            }
            return null;
        }, eN: function (val) {
            var dX = /^\d*$/;
            if (dX.test(val)) {
                return true;
            } else {
                return false;
            }
        }, cl: function () {
            var l = Math.floor(new Date().getTime() / 1000);
            var bA = 0;
            var R = "-";
            try {
                var az = this.bM(this.af);
                if (az) {
                    R = az;
                    var ep = R.indexOf("sTime=");
                    var cv = R.indexOf("&sIndex=");
                    var bi = "-";
                    if (ep < 0) {
                        bA++;
                        bi = "sTime=" + l;
                    } else {
                        bi = R.substring(0, cv);
                    }
                    var aH = 0;
                    if (cv < 0) {
                        bA++;
                        aH = 999999;
                    } else {
                        aH = R.substring(R.indexOf("&sIndex=") + 8);
                        if (!this.eN(aH)) {
                            aH = 999999;
                        } else {
                            aH++;
                        }
                    }
                    R = bi + "&sIndex=" + aH;
                    this.bx(this.af, R, 0, this.aj());
                } else {
                    R = "sTime=" + l + "&sIndex=1";
                    this.bx(this.af, R, 0, this.aj());
                }
            } catch (ex) {
            }
            return R + "&sret=" + bA;
        }, bf: function (T) {
            if (k.C < k.cK) {
                k.az = k.cl();
                var ao = null;
                var aU = "-";
                var v = null;
                var K = "-";
                if (!T) {
                    if (k.L.event) {
                        T = k.L.event;
                        ao = T.srcElement;
                    } else {
                        try {
                            var i = 0;
                            for (i = 0; i < k.L.frames.length; i++) {
                                if (k.L.frames[i].event) {
                                    T = k.L.frames[i].event;
                                    ao = T.srcElement;
                                }
                            }
                        } catch (ex) {
                        }
                    }
                } else {
                    if (T.target) {
                        ao = T.target;
                    } else if (T.srcElement) {
                        ao = T.srcElement;
                    }
                }
                if (T && ao) {
                    var am = null;
                    var cZ = k.cT(ao);
                    if (cZ && cZ.href) {
                        am = cZ;
                        v = "A";
                        K = escape(k.aO(am));
                        aU = escape(am.href);
                        if (!aU) {
                            aU = "-";
                        }
                    } else if (ao.tagName == k.cV && (ao.type == k.ds || ao.type == k.dN || ao.type == k.dv)) {
                        am = ao;
                        v = k.cV;
                        K = escape(k.aO(am));
                    } else {
                        am = k.fJ(ao);
                        if (am) {
                            v = am.tagName;
                            K = escape(k.aO(am));
                        }
                    }
                    if (am) {
                        var h = undefined;
                        if (v && v != "-") {
                            var bu = k.ea(am);
                            k.aW = k.cf(am, _ozrec);
                            var aa = 0;
                            var ag = 0;
                            if (typeof(T.pageX) != 'undefined') {
                                aa = T.pageX;
                                ag = T.pageY;
                            } else if (typeof(T.x) != 'undefined') {
                                aa = T.x;
                                ag = T.y;
                            }
                            if (bu) {
                                var cS = escape(k.aO(bu));
                                h = v + "*" + K + "*" + aa + "*" + ag + "*" + cS;
                            } else {
                                h = v + "*" + K + "*" + aa + "*" + ag;
                            }
                            var aK = Math.floor((new Date()).getTime() / 1000);
                            if (K.toLowerCase().indexOf("__ad_") == 0 || K.toLowerCase().indexOf("__zntg_") == 0) {
                                k.du(K, aK, aU);
                            } else if (bu) {
                                K = escape(k.aO(bu));
                                if (K.toLowerCase().indexOf("__ad_") == 0 || K.toLowerCase().indexOf("__zntg_") == 0) {
                                    k.du(K, aK, aU);
                                }
                            }
                        }
                        if (v && k.aZ() != '') {
                            try {
                                if (k.C == 0 && k.ad == 1) {
                                    k.C = 1;
                                    k.ad = k.C + 1;
                                } else {
                                    if (k.ad == 1) {
                                        k.C = 2;
                                    } else {
                                        k.C = k.ad;
                                    }
                                    k.ad = k.C + 1;
                                }
                            } catch (ex) {
                                k.C = 99;
                            }
                            k.dG(h, k.C, aU);
                            k.bo(100);
                        }
                    }
                }
            }
        }, bo: function (ap) {
            var eU = (new Date()).getTime();
            while (((new Date()).getTime() - eU) < ap) {
            }
        }, cW: function (type) {
            var ap = (new Date()).getTime();
            if (type == 1) {
                ap = Math.floor(ap / 1000);
            }
            return "ozrand=" + ap;
        }, dG: function (h, C, aU) {
            if (this.aZ() != '' && this.F(1) && this.bC && this.av && h && C > 0 && aU) {
                this.cB.src = this.aZ() + "?" + C + "&" + this.F(1) + "&" + this.bC + "&" + this.av + "&" + h + "&" + aU + "&" + this.al() + "&" + this.cW(1);
            }
        }, dS: function (h, C, ax, an) {
            if (this.aZ() != '' && an && this.bC && h && C > 0 && ax) {
                this.cB.src = this.aZ() + "?" + C + "&" + an + "&" + this.bC + "&-&" + h + "&" + ax + "&" + this.al() + "&" + this.cW(1);
            }
        }, eQ: function (h, C, ax, cU, an) {
            if (this.aZ() != '' && an && this.bC && h && C > 0 && ax) {
                this.cB.src = this.aZ() + "?" + C + "&" + an + "&" + this.bC + "&-&" + h + "&" + ax + "&" + this.al() + "&" + cU + "&" + this.cW(1);
            }
        }, cI: function (aP, bv) {
            var aw;
            try {
                if (typeof(aP) != "undefined") {
                    if (aP.length > this.aM) {
                        aP = aP.substring(0, this.aM);
                    }
                    aw = escape("&" + aP);
                }
            } catch (ex) {
            }
            if (typeof(aw) == "undefined") {
                aw = "-";
            }
            if (bv) {
                this.by = aw;
            }
            return aw;
        }, cL: function (bd, bv) {
            var ay;
            try {
                if (typeof(bd) != "undefined" && bd.indexOf("#") == 0 && bd.length > 1) {
                    ay = escape(bd);
                }
            } catch (ex) {
            }
            if (typeof(ay) == "undefined") {
                ay = "-";
            }
            if (bv) {
                this.av = ay;
            }
            return ay;
        }, ci: function (cA) {
            try {
                var bF = /^\d+$/;
                return bF.test(cA);
            } catch (ex) {
            }
            return false;
        }, fg: function () {
            var cP = undefined;
            try {
                cP = this.df.userAgent;
                if (cP && cP.toLowerCase().indexOf("alexa") > -1) {
                    return 1;
                }
            } catch (ex) {
            }
            return 0;
        }, cQ: function () {
            var aE = 0, bB = 0;
            if (this.di) {
                aE = this.di.width;
                bB = this.di.height;
                if (aE && bB && this.ci(aE) && this.ci(bB)) {
                    return aE + "*" + bB;
                }
            }
            return "0*0";
        }, dz: function () {
            var bq = "-";
            try {
                bq = escape(this.aR.title.substring(0, 30));
            } catch (ex) {
            }
            if (!bq) {
                bq = "-";
            }
            var bV = 0;
            var V = undefined;
            try {
                if (_ozuid) {
                    V = escape(_ozuid);
                    var bh = new Date();
                    this.bx(this.ba, V, new Date(bh.getTime() + 63072000000), this.aj());
                }
            } catch (ex) {
            }
            if (!V) {
                V = this.bM(this.ba);
                if (typeof(V) != "undefined" && V != '' && V) bV = 1; else V = "-";
            }
            var aV = this.dm();
            if (!aV) {
                aV = "-";
            }
            var dk = 0;
            try {
                var bb = new Date().getTime();
                if (_oztime && bb > _oztime) {
                    dk = bb - _oztime;
                }
            } catch (ex) {
            }
            var au = undefined;
            try {
                if (_oznvs) {
                    au = escape(_oznvs);
                }
            } catch (ex) {
            }
            if (!au) {
                au = "-";
            }
            if (!this.az) this.az = "-";
            var l = Math.floor(new Date().getTime() / 1000);
            var t = this.dp(l);
            var cr = "0";
            if (t.indexOf("&ltime=") != -1) {
                cr = t.substr(t.indexOf("&ltime=") + 7);
            }
            var bI = this.cE(true, l);
            var aC = this.dP();
            var bn = this.dC();
            return "ozlvd=" + cr + "&ozept=" + bq + "&ozsru=" + V + "&ozrucs=" + bV + "&ozscr=" + this.cQ() + "&ozplt=" + dk + "&ozalx=" + this.fg() + "&oznvs=" + au + "&ozsac=" + aV + "&ozccu=" + escape(t) + "&ozccy=" + escape(bI) + "&ozcck=" + escape(aC) + "&ozccs=" + escape(bn);
        }, al: function () {
            var bV = 0;
            var V = undefined;
            try {
                if (_ozuid) {
                    V = escape(_ozuid);
                }
            } catch (ex) {
            }
            if (!V) {
                V = this.bM(this.ba);
                if (typeof(V) != "undefined" && V != '' && V) bV = 1; else V = "-";
            }
            if (!this.aW) this.aW = "-";
            if (!this.by) this.by = "-";
            if (!this.az) this.az = "-";
            var au = undefined;
            try {
                if (_oznvs) {
                    au = escape(_oznvs);
                }
            } catch (ex) {
            }
            if (!au) {
                au = "-";
            }
            var l = Math.floor(new Date().getTime() / 1000);
            var t = this.dp(l);
            var bI = this.cE(false, l);
            var aC = this.dP();
            var bn = this.dC();
            return "ozsru=" + V + "&ozscr=" + this.cQ() + "&ozrucs=" + bV + "&ozprm=" + this.by + "&oznvs=" + au + "&ozrec=" + escape(this.aW) + "&ozccu=" + escape(t) + "&ozccy=" + escape(bI) + "&ozcck=" + escape(aC) + "&ozccs=" + escape(bn);
        }, ei: function (av, by) {
            var j = undefined;
            if (_oziframe == 0) {
                j = this.F(1);
            } else {
                j = this.dq(1);
            }
            if (this.ah && this.ah != "-") {
                this.bC = this.ah;
            } else {
                this.bC = this.ai(1);
            }
            var ak = j;
            var aD = this.bC;
            ak = this.bD(ak, "ozs");
            aD = this.bD(aD, "ozs");
            this.dh.src = this.dH() + "?1&" + ak + "&" + aD + "&" + av + "&" + by + "&" + this.dz();
            if (av == "-") {
                this.ah = j;
            } else {
                this.ah = j + av;
            }
        }, fw: function (av, by) {
            var j = undefined;
            if (_oziframe == 0) {
                j = this.F(1);
            } else {
                j = this.dq(1);
            }
            if (this.ah && this.ah != "-") {
                this.bC = this.ah;
            } else {
                this.bC = this.ai(1);
            }
            var ak = j;
            var aD = this.bC;
            this.dn.src = this.cg() + "?1&" + ak + "&" + aD + "&" + av + "&" + by + "&" + this.dz();
            if (av == "-") {
                this.ah = j;
            } else {
                this.ah = j + av;
            }
        }, bD: function (bJ, ae) {
            var bF;
            var bW = 0;
            while (bW < this.dj) {
                bF = new RegExp("%26" + ae + "%3D(.+?)%26", "g");
                if (bJ.match(bF)) {
                    bJ = bJ.replace(bF, "%26");
                    bW++;
                } else break;
            }
            bF = new RegExp("%26" + ae + "%3D(.+?)$", "i");
            bJ = bJ.replace(bF, "");
            bF = new RegExp("%3F" + ae + "%3D(.+?)%26");
            bJ = bJ.replace(bF, "%3F");
            bF = new RegExp("%3F" + ae + "%3D(.+?)$");
            bJ = bJ.replace(bF, "");
            return bJ;
        }, eG: function (T) {
            var cd = 1;
            try {
                if (T.eventPhase && T.eventPhase == 0) {
                    cd = 0;
                }
            } catch (ex) {
            }
            if (cd) {
                if (!this.L.event) {
                    this.bf(T);
                } else {
                    this.bf();
                }
            }
        }, dU: function (K, v, bj, ar) {
            var h = "";
            var cF = "-";
            var ck = "-";
            var cJ = "-";
            if (K && K != '') {
                if (this.C < this.cK) {
                    this.C++;
                    if (typeof(v) != "undefined" && v != '') {
                        ck = v;
                    }
                    if (typeof(bj) != "undefined" && bj != '') {
                        cF = bj;
                        h = ck + "*" + K + "*0*0*" + bj;
                    } else {
                        h = ck + "*" + K + "*0*0";
                    }
                    if (typeof(ar) != "undefined" && ar != '') {
                        if (ar.length > this.aQ) {
                            ar = ar.substring(0, this.aQ);
                        }
                        cJ = ar;
                    }
                    this.dG(h, this.C, cJ);
                    this.bo(100);
                }
            }
        }, de: function (aN, bZ) {
            var bv = 0;
            if (typeof(_oz_updatetail) != "undefined" && _oz_updatetail == 1) {
                bv = 1;
                this.C = 0;
                this.ad = 1;
            }
            var aw = this.cI(aN, bv);
            var ay = this.cL(bZ, bv);
            this.ei(ay, aw);
        }, eY: function () {
            var V = undefined;
            try {
                if (_ozuid) {
                    V = escape(_ozuid);
                }
            } catch (ex) {
            }
            if (!V) {
                V = "-";
            }
            var l = Math.floor(new Date().getTime() / 1000);
            var t = this.dp(l);
            var bI = this.cE(false, l);
            var aC = this.dP();
            var bn = this.dC();
            return "ozsru=" + V + "&ozscr=" + this.cQ() + "&ozprm=" + this.by + "&ozccu=" + escape(t) + "&ozccy=" + escape(bI) + "&ozcck=" + escape(aC) + "&ozccs=" + escape(bn);
        }, eB: function (bE, bS) {
            var j = undefined;
            if (_oziframe == 0) {
                j = this.F(1);
            } else {
                j = this.dq(1);
            }
            var ak = j;
            var aD = this.ai(1);
            ak = this.bD(ak, "ozs");
            aD = this.bD(aD, "ozs");
            this.dR.src = this.dI() + "?" + ak + "&" + aD + "&" + bE + "&" + bS + "&" + this.eY();
        }, bY: function (bE, bS) {
            var ce = '-';
            var dK = '-';
            if (typeof(bE) != "undefined" && bE != '') {
                ce = escape(bE);
                try {
                    if (typeof(bS) != "undefined" && bS != '') {
                        if (bS.length > this.aM) {
                            bS = bS.substring(0, this.aM);
                        }
                        dK = escape("&" + bS);
                    }
                } catch (ex) {
                }
                this.eB(ce, dK);
                this.bo(100);
            }
        }, du: function (K, aK, bX) {
            K = escape(K);
            var j = this.F(0);
            var R = this.bM(this.bO);
            if (R) {
                var G = 0, bk = 0, cz = 0;
                for (G = 0; G < R.length; G++) {
                    if (R.charAt(G) == '&') {
                        bk++;
                        if (bk == 1) {
                            cz = G + 1;
                        }
                    }
                }
                if (bk < 4) {
                    R = R + "&" + K + "*" + aK + "*" + j + "*" + bX;
                } else if (bk == 4 && cz > 0) {
                    R = R.substr(cz) + "&" + K + "*" + aK + "*" + j + "*" + bX;
                }
            } else {
                R = K + "*" + aK + "*" + j + "*" + bX;
            }
            this.bx(this.bO, R, 0, this.aj());
        }, dm: function () {
            var aF = undefined;
            var l = Math.floor((new Date()).getTime() / 1000);
            try {
                var R = "";
                var cw = this.bM(this.bO).split("&");
                for (var G = 0; G < cw.length; G++) {
                    var aA = cw[G].split("*");
                    if ((l - aA[1]) < 900 && aA[2] == escape(this.ai(0)) && aA[3] == this.F(0)) {
                        aF = aA[0];
                    } else {
                        R += (R == "" ? "" : "&") + cw[G];
                    }
                }
                this.bx(this.bO, R, 0, this.aj());
            } catch (ex) {
            }
            return aF;
        }, dp: function (l) {
            var R = "-";
            try {
                R = this.bM(this.aq);
                var bh = new Date();
                var dA = 0;
                if (!R) {
                    var cN = Math.round(bh.getTime() / 1000);
                    var aS = cN.toString(16);
                    var cp = aS.length;
                    aS = aS.substring(cp - 7, cp);
                    var cc = "";
                    for (var G = 0; G < 3; G++) {
                        var cu = Math.floor(Math.random() * 255);
                        var cX = cu.toString(16);
                        cc += (cX.length == 1 ? "0" : "") + cX;
                    }
                    var co = "v" + aS + cc + ".0";
                    R = "vid=" + co + "&ctime=" + l + "&ltime=" + dA;
                } else {
                    if (R && R.indexOf("ctime=") != -1) {
                        var bP = R.substr(R.indexOf("ctime=") + 6);
                        var cY = bP.indexOf("&");
                        if (cY != -1) {
                            bP = bP.substring(0, cY);
                        }
                        if (bP.match(/^\d*$/)) {
                            dA = new Number(bP);
                        }
                    }
                    R = R.substring(0, R.lastIndexOf("&ctime")) + "&ctime=" + l + "&ltime=" + dA;
                }
                this.bx(this.aq, R, new Date(bh.getTime() + 252288000000), this.aj());
            } catch (ex) {
            }
            return R;
        }, cE: function (fr, l) {
            var R = "-";
            try {
                var bI = this.bM(this.bQ);
                var t = this.bM(this.aq);
                if (bI) {
                    R = bI;
                    R = R.substring(0, R.lastIndexOf("&ctime")) + t.substring(t.lastIndexOf("&ctime")) + "&compid=" + this.aJ;
                    this.bx(this.bQ, R, 0, this.aj());
                }
                if (fr) {
                    var bs = 0;
                    var aG = "-";
                    var bG = "-";
                    var j = this.F(0);
                    var as = this.ai(0);
                    var cn = 1;
                    var aI = 0;
                    if (as != "-") {
                        var cj = this.cg().split(";")[3].split(":");
                        for (var G = 0; G < cj.length; G++) {
                            if (as.indexOf(cj[G]) != -1) {
                                cn = 0;
                            }
                        }
                        if (cn == 1) {
                            bs = 1;
                        }
                    }
                    var bL = j.lastIndexOf("%3Fozu_sid%3D");
                    if (bL == -1) {
                        bL = j.lastIndexOf("%26ozu_sid%3D");
                    }
                    var aB = j.lastIndexOf("%3Fozs%3D");
                    if (aB == -1) {
                        aB = j.lastIndexOf("%26ozs%3D");
                    }
                    if (bL != -1 && bL > aB) {
                        bs = 1;
                        var cR = j.split(/%3Fozu_sid%3D|%26ozu_sid%3D/);
                        if (cR.length > 1) {
                            var aX = cR[1];
                            var ac = aX.indexOf("%26");
                            if (ac != -1) {
                                aX = aX.substr(0, ac);
                            }
                            aG = aX;
                            aI = 1;
                        }
                    }
                    if (aB != -1 && aB > bL) {
                        bs = 1;
                        var dQ = j.split(/%3Fozs%3D|%26ozs%3D/);
                        for (var G = 1; G < dQ.length && G < 4; G++) {
                            var bz = dQ[G];
                            var ac = bz.indexOf("%26");
                            if (ac != -1) {
                                bz = bz.substr(0, ac);
                            }
                            if (bz.indexOf("-") == -1) {
                                bG = bz;
                                aI = 2;
                                break;
                            } else {
                                var dF = bz.split("-");
                                if (dF.length == 2 && dF[1] == this.aJ) {
                                    bG = dF[0];
                                    aI = 2;
                                    break;
                                }
                            }
                        }
                    }
                    if (!bI && as == "-") {
                        bs = 1;
                    }
                    if (bs) {
                        R = "erefer=" + as + "&eurl=" + j + "&etime=" + l + t.substring(t.lastIndexOf("&ctime")) + "&compid=" + this.aJ;
                        this.bx(this.bQ, R, 0, this.aj());
                        if (aG != "-" || bG != "-") {
                            var aC = "";
                            var dg = R.indexOf("&etime=");
                            if (dg != -1) {
                                aC = "etime=" + l + "&ozu_sid=" + aG + "&ozs=" + bG + "&flag=" + aI + "&compid=" + this.aJ;
                                this.bx(this.dM, aC, new Date(new Date().getTime() + 30 * 86400 * 1000), this.aj());
                                this.bx(this.cC, aC, 0, this.aj());
                            }
                        }
                    }
                }
            } catch (ex) {
            }
            return R;
        }, dP: function () {
            var aC = "-";
            try {
                var aF = this.bM(this.dM);
                if (aF) {
                    aC = aF;
                }
            } catch (ex) {
            }
            return aC;
        }, dC: function () {
            var bn = "-";
            try {
                var aF = this.bM(this.cC);
                if (aF) {
                    bn = aF;
                }
            } catch (ex) {
            }
            return bn;
        }, ca: function () {
            try {
                if (typeof(this.dB) == "undefined") {
                    this.fL();
                    this.dB = 1;
                    this.ad = 1;
                    this.cb = 1;
                } else {
                    this.dB = 2;
                    this.cb = 2;
                }
                this.az = this.cl();
                if (this.cb == 1) {
                    this.cI(this.L._ozprm, 1);
                    this.cL(this.L._ozurltail, 1);
                    if (this.L.onload) {
                        this.L["__99_A6D_pageonload"] = this.L.onload;
                    }
                    this.L.onload = this.fu;
                    this.cG(this.aR, this.bf);
                    this.fw(this.av, this.by);
                }
            } catch (ex) {
            }
            return this;
        }
    };
    if (typeof(_99_A6D) == "undefined") {
        _99_A6D = k.ca();
        __ozclk = function () {
            try {
                var T = _99_A6D.L.event || arguments.callee.caller.arguments[0];
                _99_A6D.eG(T);
            } catch (e) {
            }
        };
        __ozEvent = function (bE, bS) {
            _99_A6D.bY(bE, bS);
        };
        __ozfac2 = function (aN, bZ) {
            _99_A6D.de(aN, bZ);
        };
        __ozfaj2 = function (K, v, bj, ar) {
            _99_A6D.dU(K, v, bj, ar);
        };
    }
})();
