
SET CURRENT_DIR=%CD%

SET MONGODB_VERSION=4.0
SET MONGODB_PATH=C:\Program Files\MongoDB\Server\%MONGODB_VERSION%

SET CURRENT_DIR=%CD%

"%MONGODB_PATH%\bin\mongoimport" --jsonArray --db  tvheadend --collection entries %CD%/entries.json
