<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
<head>
    <meta charset="UTF-8">
    <title>Расчет и сохранение договора</title>
    <script>var contextPath = '${pageContext.request.contextPath}';</script>
    <style>
.wrapper:not(.preload)>.preloader {
    visibility: hidden;
    opacity: 0;
}
.wrapper.preload>.content-wrapper {
    visibility: hidden;
    opacity: 0;
}
.wrapper.preload>.preloader {
    position: fixed;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 90%;
    z-index: 9999;
}
.wrapper.preload>.preloader-bg {
    content: "";
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 9998;
}
.wrapper:not(.preload)>.preloader-bg {
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity .5s ease-in-out,visibility .5s ease-in-out;
    -o-transition: opacity .5s ease-in-out,visibility .5s ease-in-out;
    transition: opacity .5s ease-in-out,visibility .5s ease-in-out;
}
.preloader .preloader-title {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
}
.wrapper:not(.preload) .preloader-progress::before {
    width: 100%
}
.wrapper.preload .preloader-progress {
    position: absolute;
    display: block;
    bottom: 10%;
    left: 50%;
    width: 800px;
    min-width: 240px;
    max-width: 60%;
    height: 1px;
    background-color: rgba(55,55,55,.95);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}
.preloader-progress>div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 80px;
    background-color: #fff;
    will-change: width;
    -webkit-transition: width 1.5s ease-in-out;
    -o-transition: width 1.5s ease-in-out;
    transition: width 1.5s ease-in-out;
    -webkit-transition-delay: .5s;
    -o-transition-delay: .5s;
    transition-delay: .5s;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}
    </style>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/favicon.ico">

</head>
<body>
<div class="wrapper preload">
    <div class="preloader">
        <div class="preloader-content">
            <div class="preloader-title">...</div>
            <div class="preloader-progress">
                <div style="transition-duration: 1000ms; width: 0%;"></div>
            </div>
        </div>
    </div>
    <div class="preloader-bg"></div>
    <div class="content-wrapper" id="content-wrapper">
        ...
    </div>
    <script src="${pageContext.request.contextPath}/static/app/app.bundle.js"></script>
</div>
</body>
</html>
