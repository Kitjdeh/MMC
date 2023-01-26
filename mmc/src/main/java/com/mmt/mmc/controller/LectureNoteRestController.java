package com.mmt.mmc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmt.mmc.model.dto.LectureNoteDto;
import com.mmt.mmc.model.service.LectureNoteService;

@RestController
@RequestMapping("/api/v1/notes")
public class LectureNoteRestController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private LectureNoteService lectureNoteService;

	@PostMapping
	public ResponseEntity<String> lectureNoteSave(@RequestBody LectureNoteDto lectureNoteDto) {
		lectureNoteService.saveLectureNote(lectureNoteDto);
		return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	@GetMapping("/{lecture_note_id}")
	public ResponseEntity<LectureNoteDto> lectureNoteDetails(@PathVariable("lecture_note_id") int lectureNoteId){
		LectureNoteDto lectureNoteDto = lectureNoteService.findLectureNote(lectureNoteId);
		return new ResponseEntity<>(lectureNoteDto,HttpStatus.OK);
	}

	@PatchMapping("/{lecture_note_id}")
	public ResponseEntity<String> lectureNoteModify(@RequestBody LectureNoteDto lectureNoteDto){
		lectureNoteService.saveLectureNote(lectureNoteDto);
		return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
	}

	@DeleteMapping("/{lecture_note_id}")
	public ResponseEntity<String> lectureNoteRemove(@PathVariable("lecture_note_id") int lectureNoteId){
		lectureNoteService.removeLectureNote(lectureNoteId);
		return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
	}
}
