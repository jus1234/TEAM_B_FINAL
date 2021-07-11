<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- ��� ���� ���� -->
<!-- �� ��� ���� ���� -->
<div id="header">
	<div class="headerWrap">
		<div class="headerTop">
			<h1>
				<a href="/"><img src="resources/images/logo.svg"
					style="width: 120px; padding-top: 5px" alt="���´�Ʈ �ΰ�" /></a>
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
			<li><a href="/intro/main.do">����API �Ұ�</a>
				<ul class="first">
					<li><a href="/intro/main.do">����API �Ұ�</a></li>
					<li><a href="/intro/infoApiList.do">����API ���� �Ұ�</a></li>
					<li><a href="/intro/terms.do">�̿���</a></li>
					<li><a href="/intro/confirm.do">�������� �����̿뵿��</a></li>
				</ul></li>
			<li><a href="/mng/userApiKeyListView.do">����Ű ��û/����</a>
				<ul>
					<li><a href="/uss/umt/EgovMberInsertView.do">����Ű ��û</a></li>
					<li><a href="/mng/userApiKeyListView.do">����Ű ����</a></li>
					<li><a href="/mng/apiUsageStatusView.do">����API �̿���Ȳ</a></li>
				</ul></li>
			<li><a href="/guide/main.do?apiGrpCd=DS001">���߰��̵�</a>
				<ul>
					<li><a href="/guide/main.do?apiGrpCd=DS001">��������</a></li>
					<li><a href="/guide/main.do?apiGrpCd=DS002">������� �ֿ�����</a></li>
					<li><a href="/guide/main.do?apiGrpCd=DS003">������ �繫����</a></li>
					<li><a href="/guide/main.do?apiGrpCd=DS004">���а��� ��������</a></li>
				</ul></li>
			<li><a href="/disclosureinfo/biz/main.do">�������� Ȱ�븶��</a>
				<ul>
					<li><a href="/disclosureinfo/biz/main.do">������� �ֿ�������ȸ</a></li>
					<li><a href="/disclosureinfo/fnltt/singl/main.do">�繫������ȸ</a></li>
					<li><a href="/disclosureinfo/fnltt/dwld/main.do">�繫�����ϰ��ٿ�ε�</a></li>
					<li><a href="/disclosureinfo/qota/main.do">���а��� ����������ȸ</a></li>
				</ul></li>
			<li><a
				href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000001">����â��</a>
				<ul>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000001">��������</a></li>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000002">FAQ
					</a></li>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000003">Q&A</a></li>
					<li><a
						href="/cop/bbs/selectArticleList.do?bbsId=B0000000000000000004">���������˸�</a></li>
				</ul></li>
			<li><a href="/mng/selectUserInfoView.do">����������</a>
				<ul>
					<li><a href="/mng/selectUserInfoView.do">����� ������ȸ</a></li>
					<li><a href="/mng/changeUserPwView.do">��й�ȣ ����</a></li>
					<li><a href="/mng/signOutUserView.do">Ż���ϱ�</a></li>
				</ul></li>
		</ul>
	</div>
	<div class="bg01"></div>
</div>
<!-- �� ��� ���� �� -->
<!-- ��� ���� �� -->
