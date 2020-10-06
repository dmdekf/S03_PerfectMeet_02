package com.POM.MatNam.File.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.POM.MatNam.File.Payload.UploadFile;


 
public interface FileDAO extends CrudRepository<UploadFile, Integer>{
	List<UploadFile> findByReviewId(int rid);
}
