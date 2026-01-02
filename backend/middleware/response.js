export const responseMiddleware = (req, res, next) => {

  res.success = function (data = {}, message = "Success") {
    return res.json({
      success: true,
      message,
      ...data
    });
  };

  // Pagination Response
  res.pagination = function (
    results = [],
    total_count = 0,
    limit = 10,
    pageNo = 1,
    range = 3
  ) {
    const totalPages = Math.ceil(total_count / limit);
    const pagination = [pageNo];

    for (let i = 1; i <= range && pageNo + i <= totalPages; i++) {
      pagination.push(pageNo + i);
    }

    for (let j = 1; j <= range && pageNo - j >= 1; j++) {
      pagination.unshift(pageNo - j);
    }

    return this.success({
      count: total_count,
      current_page: pageNo,
      totalPages,
      pagination,
      record: results
    });
  };

  next();
};
