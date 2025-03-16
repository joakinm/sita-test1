fetchUrls(urls: string[], maxConcurrency: number): Observable<any[]> {
  return from(urls).pipe(
    mergeMap(url => this.http.get(url), maxConcurrency),
    toArray()
  );


describe('UrlsService', () => {
  let service: UrlsService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UrlsService]
    });
    service = TestBed.inject(UrlsService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should fetch all URLs with limited concurrency', () => {
    const urls = ['http://example.com', 'http://example.org', 'http://example.net'];
    const maxConcurrency = 2;
    const mockResponses = [
      { data: 'response1' },
      { data: 'response2' },
      { data: 'response3' }
    ];


    service.fetchUrls(urls, maxConcurrency).subscribe(responses => {
      expect(responses.length).toBe(3);
      expect(responses).toEqual(mockResponses);
    });


    urls.forEach((url, index) => {
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
    }}
  )
});