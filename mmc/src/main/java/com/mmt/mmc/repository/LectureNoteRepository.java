package com.mmt.mmc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmt.mmc.entity.LectureNote;

import java.util.Optional;

public interface LectureNoteRepository extends JpaRepository<LectureNote, Integer> {
    Optional<LectureNote> findByQuestionId(int questionId);
}
