package com.mmt.mmc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mmt.mmc.model.dto.LectureNoteDto;
import com.mmt.mmc.model.service.LectureNoteService;

@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin(origins = "*")
public class LectureNoteRestController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private LectureNoteService lectureNoteService;

	// 강의 노트 생성
	@PostMapping
	public ResponseEntity<String> lectureNoteAdd(@RequestBody LectureNoteDto lectureNoteDto) {
		lectureNoteService.saveLectureNote(lectureNoteDto);
		return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	// 강의 노트 가져오기
	@GetMapping("/{lecture_note_id}")
	public ResponseEntity<LectureNoteDto> lectureNoteDetails(@PathVariable("lecture_note_id") int lectureNoteId){
		LectureNoteDto lectureNoteDto = lectureNoteService.findLectureNote(lectureNoteId);
		return new ResponseEntity<>(lectureNoteDto,HttpStatus.OK);
	}

	// 강의 노트 수정
	@PatchMapping("/{lecture_note_id}")
	public ResponseEntity<String> lectureNoteModify(@RequestBody LectureNoteDto lectureNoteDto){
		lectureNoteService.saveLectureNote(lectureNoteDto);
		return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
	}

	// 강의 노트 삭제
	@DeleteMapping("/{lecture_note_id}")
	public ResponseEntity<String> lectureNoteRemove(@PathVariable("lecture_note_id") int lectureNoteId){
		lectureNoteService.removeLectureNote(lectureNoteId);
		return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
	}
}
