package com.mmt.mmc.model.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmt.mmc.entity.LectureNote;
import com.mmt.mmc.model.dto.LectureNoteDto;
import com.mmt.mmc.repository.LectureNoteRepository;

@Service
public class LectureNoteServiceImpl implements LectureNoteService{
	@Autowired
	private LectureNoteRepository lectureNoteRepository;

	// 강의 노트 찾기
	@Override
	public LectureNoteDto findLectureNote(int lectureNoteId) {
		Optional<LectureNote> lectureNoteWrapper = lectureNoteRepository.findByQuestionId(lectureNoteId);
		if(lectureNoteWrapper.isPresent()){
			LectureNote lectureNote = lectureNoteWrapper.get();
			LectureNoteDto dto = LectureNoteDto.builder()
				.lectureNoteId(lectureNote.getLectureNoteId())
				.questionId(lectureNote.getQuestionId())
				.lectureTime(lectureNote.getLectureTime())
				.pdfUrl(lectureNote.getPdfUrl())
				.build();
			return dto;
		}
		return null;
	}

	// 강의 노트 삽입, 수정
	@Override
	@Transactional
	public void saveLectureNote(LectureNoteDto lectureNoteDto) {
		lectureNoteRepository.save(lectureNoteDto.toEntity());
	}

	// 강의 노트 제거
	@Override
	public void removeLectureNote(int lectureNoteId) {
		Optional<LectureNote> lectureNoteWrapper = lectureNoteRepository.findById(lectureNoteId);
		if(lectureNoteWrapper.isPresent()){
			LectureNote lectureNote = lectureNoteWrapper.get();
			lectureNoteRepository.deleteById(lectureNote.getLectureNoteId());
		}
	}
}
