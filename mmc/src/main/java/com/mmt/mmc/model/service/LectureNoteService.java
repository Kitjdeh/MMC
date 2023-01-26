package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.LectureNoteDto;

public interface LectureNoteService {
	public LectureNoteDto findLectureNote(int lectureNoteId);
	public void saveLectureNote(LectureNoteDto lectureNoteDto);
	public void removeLectureNote(int lectureNoteId);
}
