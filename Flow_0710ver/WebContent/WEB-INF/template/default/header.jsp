<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 헤더 영역 시작 -->
<!-- 웹 헤더 영역 시작 -->
<div id="header">
	<div class="headerWrap">
		<div class="headerTop">
			<h1>
				<a href="/"><img src="resources/images/logo.svg"
					style="width: 120px; padding-top: 5px" alt="오픈다트 로고" /></a>
			</h1>
			<div class="util_menu">
				<form name="selectOne" method="post">
					<ul>
						<li><a href='/uat/uia/egovLoginUsr.do'>LOGIN</a></li>
						<li><a href="/sitemap/main.do">SITE MAP</a></li>
					</ul>
				</form>
			</div>
		</div>
		<ul class="gnb">
			<li><a href="/intro/main.do">오픈API 소개</a>
				<ul class="first">
					<li><a href="/intro/main.do">오픈API 소개</a></li>
					<li><a href="/intro/infoApiList.do">오픈API 서비스 소개</a></li>
					<li><a href="/intro/terms.do">이용약관</a></li>
					<li><a href="/intro/confirm.do">개인정보 수집이용동의</a></li>
				</ul></li>
			<li><a href="/mng/userApiKeyListView.do">인증키 신청/관리</a>
				<ul>
					<li><a href="/uss/umt/EgovMberInsertView.do">인증키 신청</a></li>
					<li><a href="/mng/userApiKeyListView.do">인증키 관리</a></li>
					<li><a href="/mng/apiUsageStatusView.do">오픈API 이용현황</a></li>
				</ul></li>
			<li><a href="/guide/main.do?apiGrpCd=DS001">개발가이드</a>
				<ul>
					<li><a href="/guide/main.do?apiGrpCd=DS001">공시정보</a></li>
					<li><a href="/guide/main.do?apiGrpCd=DS002">사업보고서 주요정보</a></li>
					<li><a href="/guide/main.do?apiGrpCd=DS003">상장기업 재무정보</a></li>
					<li><a href="/guide/main.do?apiGrpCd=DS004">지분공시 종합정보</a></li>
				</ul></li>
			<li><a href="/disclosureinfo/biz/main.do">공시정보 활용마당</a>
				<ul>
					<li><a href="/disclosureinfo/biz/main.do">사업보고서 주요정보조회</a></li>
					<li><a href="/disclosureinfo/fnltt/singl/main.do">재무정보조회</a></li>
					<li><a href="/disclosureinfo/fnltt/dwld/main.do">재무정보일괄다운로드</a></li>
					<li><a href="/disclosureinfo/qota/main.do">지분공시 종합정보조회</a></li>
				</ul></li>
			<li><a
				href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000001">소통창구</a>
				<ul>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000001">공지사항</a></li>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000002">FAQ
					</a></li>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000003">Q&A</a></li>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000004">변동내역알림</a></li>
				</ul></li>
			<li><a href="/mng/selectUserInfoView.do">마이페이지</a>
				<ul>
					<li><a href="/mng/selectUserInfoView.do">사용자 정보조회</a></li>
					<li><a href="/mng/changeUserPwView.do">비밀번호 변경</a></li>
					<li><a href="/mng/signOutUserView.do">탈퇴하기</a></li>
				</ul></li>
		</ul>
	</div>
	<div class="bg01"></div>
</div>
<!-- 웹 헤더 영역 끝 -->
<!-- 헤더 영역 끝 -->
