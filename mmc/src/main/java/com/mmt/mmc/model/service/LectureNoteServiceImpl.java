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

	@Override
	public LectureNoteDto findLectureNote(int lectureNoteId) {
		Optional<LectureNote> lectureNoteWrapper = lectureNoteRepository.findById(lectureNoteId);
		if(lectureNoteWrapper.isPresent()){
			LectureNote lectureNote = lectureNoteWrapper.get();
			LectureNoteDto dto = LectureNoteDto.builder()
				.lectureNoteId(lectureNoteId)
				.questionId(lectureNote.getQuestionId())
				.lectureTime(lectureNote.getLectureTime())
				.pdfUrl(lectureNote.getPdfUrl())
				.build();
			return dto;
		}
		return null;
	}

	@Override
	@Transactional
	public void saveLectureNote(LectureNoteDto lectureNoteDto) {
		lectureNoteRepository.save(lectureNoteDto.toEntity());
	}

	@Override
	public void removeLectureNote(int lectureNoteId) {
		Optional<LectureNote> lectureNoteWrapper = lectureNoteRepository.findById(lectureNoteId);
		if(lectureNoteWrapper.isPresent()){
			LectureNote lectureNote = lectureNoteWrapper.get();
			lectureNoteRepository.deleteById(lectureNote.getLectureNoteId());
		}
	}
}
