(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery', 'waitMe', 'toastr', 'paging', 'bootstrap', 'scrollbar', 'circleChart', 'simditor'], factory);
    } else {
        factory(root.jQuery);
    }
}(this, function ($, wm, toastr, paging, bootstrap, scrollbar, circleChart, simditor) {

    $.fn.startBlockLoding = function (message) {
        $(this).waitMe({
            effect: 'roundBounce',
            text: message,
            bg: 'rgba(255,255,255,0.7)',
            color: '#000',
            sizeW: '',
            sizeH: ''
        });
    };

    $.fn.stopBlockLoding = function () {
        $(this).waitMe('hide');
    };

    $.fn.simpleDropdown = function () {
        $(this).dropdown();
    };

    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        cache: false,
        error: function (xhr, textStatus, errorThrown) {
            if (xhr.status === 911 || xhr.status === 0) { // ajax调用session timeout
                _handleSessionTimeout(xhr);
            } else if (xhr.status == 404) { // ajax调用出现404，则返回到home
                // window.location = g_rootPath + "/";
            } else {
                // $.ui.toastr.error("系统维护中，请稍候再试！");
            }
        },
        complete: function (xhr, textStatus) {
            // session timeout
            if (xhr.status === 911 || xhr.status === 0) {
                _handleSessionTimeout(xhr);
                return;
            }
            $.ui.stopBlockLoding();
        }
    });

    // 设置 ajax 操作统一的 ctx
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    _handleSessionTimeout = function (xhr) {
        window.location = _ctx + "/";
    };

    $.fn.simplePieChart = function () {
        $(this).easyPieChart({
            scaleColor: false,
            barColor: '#5cb85c',
            lineWidth: 6,
            lineCap: 'butt',
            size: 80,
            onStep: function (from, to, percent) {
                $(this.el).find('.easypie-text').html(Math.round(percent) + '<sup style="font-size: 15px">%</sup>');
            }
        });
    }

    $.fn.simpleCircleChart = function () {
        $(this).easyPieChart({
            barColor: '#5bb4d8',
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: 4,
            size: 50
        });
    }

    $.fn.doLoad = function (url, callback, paras) {
        $(this).startBlockLoding('Loading...');
        //
        var action = $.ui.appendUrlTimestamp(url);
        //
        $(this).load(action, paras, function (response, status, xhr) {
            // 请求异常处理
            if (status == "error") {
                // alert(xhr.status + ' : ' + xhr.statusText);
            } else {
                if ($.isFunction(callback)) {
                    callback.call(this);
                }
            }
        });
    };

    handlePaging = function (target, totalPage, onPageClickEvent) {
        var paginationObj = target.find('.pagination-control');

        paginationObj.empty().removeData("twbs-pagination").unbind("page");

        if (Number(totalPage) === 0) {
            return;
        }

        paginationObj.twbsPagination({
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            totalPages: totalPage === 0 ? 1 : totalPage,
            visiblePages: 6,
            version: '1.1',
            initiateStartPageClick:false,
            onPageClick: onPageClickEvent
        });
    };

    handleDropdownMenuChange = function (target, callback, activeFirst) {
        var $parent = target.parent();

        target.on('click', function () {

            var $this = $(this);

            $parent.find('a').removeClass('active');
            $this.addClass('active');

            $parent.parent().find('.dropdown-toggle').html($this.text());

            // 触发回调事件
            if (callback !== undefined && $.isFunction(callback)) {
                callback.call();
            }
        });

        if (activeFirst) {
            target.parent().find('.active').trigger('click');
        }
    };

    handleTabNavbar = function (target, callback, activeFirst) {
        target.on('click', function (e) {
            e.preventDefault();
            var $this = $(e.currentTarget);
            var url = $this.attr('href');
            target.removeClass("active");
            $this.addClass("active");

            // 触发回调事件
            if (callback !== undefined && $.isFunction(callback)) {
                callback.call(url);
            }
        });

        if (activeFirst) {
            target.parent().find('.active').trigger('click');
        }
    };

    handleScrollbar = function (target, zIndex, isHorizrail) {
        // 移动端设备不加载滚动条
        if (navigator.userAgent.match(/mobile/i)) {
            target.find(".scroller").css("overflow", "auto");
            return;
        }

        target.find('.scroller').each(function () {
            var leftOffset = $(this).data('leftoffset');
            var topOffset = $(this).data('topoffset');

            $(this).niceScroll({
                cursorcolor: '#000000',
                zindex: zIndex == undefined ? 0 : zIndex,
                cursoropacitymax: 0.4,
                cursorborder: '',
                cursorborderradius: 0,
                cursorwidth: '5px',
                enablescrollonselection: false,
                horizrailenabled: isHorizrail === undefined ? true : isHorizrail,
                railoffset: {
                    top: topOffset == undefined ? 0 : topOffset,
                    left: leftOffset == undefined ? 0 : leftOffset
                }
            });
        });
    }

    handleSimpleHtmlEditor = function (target, container) {
        var toolbar = ['title', 'bold', 'underline', 'ol', 'ul', 'hr', 'indent', 'outdent'];
        var contentEditor = new Simditor({
            textarea: target,
            placeholder: '',
            toolbar: toolbar,
            pasteImage: false,
            toolbarFloat: false
        });

        if (container != undefined) {
            $(container).find('.simditor-body').addClass('scroller');
        }

        return contentEditor;
    }

    $.ui = {
//        alerts: {
//            alert: function (message, options) {
//                bootbox.alert(message, options);
//            },
//            success: function (message, options) {
//                bootbox.alert(message);
//            },
//            failure: function (message, options) {
//                bootbox.alert(message);
//            },
//            confirm: function (message, options) {
//                bootbox.confirm(message, options);
//            },
//            prompt: function (message, value, callback) {
//
//            }
//        },
        toastr: {
            info: function (message) {
                $('#toast-container').find('.toast-info').remove();
                toastr.info(message);
            },
            success: function (message) {
                $('#toast-container').find('.toast-success').remove();
                toastr.success(message);
            },
            error: function (message) {
                $('#toast-container').find('.toast-error').remove();
                toastr.error(message);
            },
            warning: function (message) {
                $('#toast-container').find('.toast-warning').remove();
                toastr.warning(message);
            }
        },
        showInputErrorTip: function (input, value) {
            var inputTip = input.parent().children("span.text-danger");
            inputTip.css("display", "block");
            if (value !== undefined) {
                inputTip.html(value);
                input.focus();
            }
            return false;
        },
        hideInputErrorTip: function (input) {
            input.parent().children("span.text-danger").css("display", "none");
        },
        initPaging: function (target, totalPage, onPageClickEvent) {
            handlePaging(target, totalPage, onPageClickEvent);
        },
        initDropdownMenuChange: function (target, callback, isFirst, isActive) {
            handleDropdownMenuChange(target, callback, isFirst, isActive);
        },
        initTabNavbar: function (target, callback, activeFirst) {
            handleTabNavbar(target, callback, activeFirst);
        },
        initScrollbar: function (target, zIndex, isHorizrail) {
            handleScrollbar(target, zIndex, isHorizrail);
        },
        initSimpleHtmlEditor: function (target, container) {
            handleSimpleHtmlEditor(target, container);
        },
        doAction: function (actionUrl, paras, successfulCallback, failedCallback, successfulMsg, failedMsg, isAsync) {
            $.ajax({
                url: actionUrl,
                type: "POST",
                data: paras,
                async: isAsync == undefined ? true : false,
                cache: false,
                dataType: "text",
                beforeSend: function (jqXHR, settings) {
                    // $.ui.showLoading();
                },
                success: function (responseData) {
                    var response = $.parseJSON(responseData);
                    if (response.status === '200') {
                        //
                        if (typeof successfulCallback == 'function') {
                            successfulCallback.call(response);
                        }
                        if (successfulMsg === '') {
                            return;
                        }
                        $.ui.toastr.success(successfulMsg);
                    } else {
                        $.ui.toastr.error(failedMsg + response.data);
                        //
                        if (typeof failedCallback == 'function') {
                            failedCallback.call(response);
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.ui.toastr.error(XMLHttpRequest.status + ":" + errorThrown, '异常提示');
                }
            });
        },
        doSimpleAction: function (actionUrl, paras, successfulMsg, failedMsg, isAsync) {
            $.ajax({
                url: actionUrl,
                type: "POST",
                data: paras,
                async: isAsync == undefined ? true : false,
                cache: false,
                dataType: "text",
                beforeSend: function (jqXHR, settings) {
                    // $.ui.startBlockLoding('数据保存中．．．');
                },
                success: function (responseData) {
                    var response = $.parseJSON(responseData);
                    if (response.status === '0') {
                        if (successfulMsg !== '') {
                            $.ui.toastr.success(successfulMsg);
                        }
                    } else {
                        $.ui.toastr.error(failedMsg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.ui.toastr.error(XMLHttpRequest.status + ":" + errorThrown, '异常提示');
                }
            });
        },
        appendUrlParam: function (url, param) {
            if (url.indexOf("?") > 0) {
                url += "&";
            } else {
                url += "?";
            }
            return url + param;
        },
        appendUrlTimestamp: function (url) {
            if (url.indexOf("?") > 0) {
                url += "&";
            } else {
                url += "?";
            }
            return url + new Date().getTime();
        },
        arrayToString: function (inArray) {
            return inArray.join(",");
        },
        startBlockLoding: function (message) {
            $('body').startBlockLoding(message);
        },
        stopBlockLoding: function () {
            $('body').stopBlockLoding();
        },
        openDialog: function (url, width, height, backdrop, data) {
            // 防止重复打开多个模式窗口
            if ($('.modal-backdrop').is(':visible')) {
                return false;
            }
            var $modal = $('<div class="modal fade"  tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-content-loading">加载中...</div></div></div></div>');
            $modal.find('.modal-dialog').width(width).height(height);

            // backdrop:static 静态,点击遮罩层不关闭
            // backdrop:true 动态,点击遮罩层关闭
            // backdrop:false 无遮罩层
            $modal.modal({
                backdrop: 'static',
                keyboard: true
            });

            $modal.on('shown.bs.modal', function () {
                $modal.find('.modal-content').load($.ui.appendUrlTimestamp(url), data, function () {
                });
            });

            // 关闭modal时销毁modal
            $modal.on('hidden.bs.modal', function () {
                $(this).remove();
            });
            return false;
        },
        openModalWindow: function (url, width, height, data) {
            this.openDialog(url, width, height, 'static', data);
        },
        closeWindow: function () {
            $(".modal-header button.close:last").trigger('click');
        },
        closeFloatWindow: function () {
            $.powerFloat.hide();
        }
    };

}));