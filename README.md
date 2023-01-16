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
