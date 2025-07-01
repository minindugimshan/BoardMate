-- Add student_id column to property table
-- This column will store the ID of the student who booked the property
-- NULL means the property is not booked

ALTER TABLE property ADD COLUMN student_id BIGINT NULL;

-- Add foreign key constraint to reference the user table
-- This ensures data integrity
ALTER TABLE property ADD CONSTRAINT fk_property_student 
FOREIGN KEY (student_id) REFERENCES user(id) ON DELETE SET NULL;

-- Add index for better query performance
CREATE INDEX idx_property_student_id ON property(student_id);

-- Add comment to document the column purpose
ALTER TABLE property MODIFY COLUMN student_id BIGINT NULL COMMENT 'ID of the student who booked this property. NULL if not booked.'; 