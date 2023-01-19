1.사용자
-사용자 식별자(기본키) <int not null auto incre>
-관리자여부 (0:사용자, 1:관리자) <int default : 0>
-소셜(0:없음 ,1:카카오) <int default : 0>
-온라인 여부 (0:오프라인, 1:온라인) <int default : 0>
-프로필 : url <varchar(1000)>
-아이디 <varchar(20) not null unique>
-비밀번호 <varchar(100) not null unique>
-이름 <varchar(20) not null unique>
-이메일 <varchar(50) not null unique>
-닉네임 <varchar(20) not null unique>
-언어 : 비트마스킹 <int not null> : input으로 0으로 못받음.
-휴대폰 <varchar(20) not null>
-학교 <varchar(20)>
-직장 <varchar(20)>
-백준ID <varchar(50)>
-수상 및 자격증 <varchar(100)>
-포인트 <int default : 0>
-입출금내역 식별자(외래키) <int>
-강사온도 <int default : 0> : 0 이하일때는 "-", 100점 만점

1-1. 입출금내역
-입출금내역 식별자(기본키) <int not null auto incre>
-사용자 식별자(외래키) <int not null>
-입출금여부 (0:입금, 1:출금) <int not null>
-금액<int not null>
-날짜<date not null>


2.질문
-질문 식별자(기본키) <int not null auto incre>
-유저 식별자(외래키) : 학생 <int not null>
-진행여부(0:진행전(채택전), 1:진행중(채택후), 2:완료) <int not null>
-평가점수 <int> : 100점만점
-언어 (0:python, 1:java, 2:C) <int not null>
-카테고리(0:알고리즘, 1:디버깅) <int not null>
-알고리즘(bfs, dfs, 그래프, DP, 정렬, 그리디, 시뮬레이션, 분할정복, 순열, 조합, 부분집합, 최소스패닝트리,기타) : 비트마스킹 <int not null>
-출처(0:백준, 1:프로그래머스) <int not null>
-문제번호 <int not null>
-제목 <varchar(50) not null>
-내용 <varchar(1000) not null>
-예약 시간(date, 시간,분만 잇음) <timestamp not null>
-코드 <varchar(10000) not null>
-포인트 <int not null>

2-1. 질문_선생 question_trainner
-질문_선생식 식별자 <int not null auto incre>
-질문 식별자(외래키) <int not null>
-유저 식별자(외래키) : 선생 <int not null>
-채택여부 (0:채택X, 1:채택) <int default : 0>

3.강의노트
-강의노트 식별자(기본키) <int not null auto incre>
-질문 식별자(외래키) <int not null>
-경과시간 <int default : 0>
-문제드로잉 <varchar(10000) not null>
-코드드로잉 <varchar(10000) not null>
-낙서장드로잉 <varchar(10000) not null>

4.공지
-공지식별자 <int not null auto incre>
-제목 <varchar(50) not null>
-내용 <varchar(1000) not null>
-날짜 <timestamp>

5.FAQ
-FAQ 식별자 <int not null auto incre>
-제목 <varchar(50) not null>
-내용 <varchar(1000) not null>
-날짜 <timestamp>

![MMC](/uploads/f6f7f58551d4f77cde44b3ad726908b9/MMC.png)
