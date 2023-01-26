package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.LectureNoteDto;

public interface LectureNoteService {
	// 강의 노트 찾기
	public LectureNoteDto findLectureNote(int lectureNoteId);
	// 강의 노트 삽입, 수정
	public void saveLectureNote(LectureNoteDto lectureNoteDto);
	// 강의 노트 제거
	public void removeLectureNote(int lectureNoteId);
}
