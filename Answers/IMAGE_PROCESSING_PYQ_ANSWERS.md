# Digital Image Processing — PYQ Answers (Syllabus-Aligned Edition)

## Course and source details
- **Course:** CS633 — Image Processing (B.Tech, VI Semester)
- **Full marks / duration shown in papers:** 70 marks / 3 hours
- **Syllabus basis supplied by the student:** Modules 1–5 and the stated course outcomes CO1–CO4.
- **Primary textbook:** Rafael C. Gonzalez and Richard E. Woods, *Digital Image Processing*, 3rd Edition, Pearson Education, 2010.
- **Reference:** Gonzalez, Woods and Eddins, *Digital Image Processing Using MATLAB*, 3rd Edition, 2011.
- **PYQ papers visible in the supplied PDF:** 2025, 2024, 2023, 2022 and 2021.

> **2021 scan note:** The 2021 paper is split across PDF pages 8–9. On page 8, the five Q8 short-note options appear in the left column, while the 2021 paper heading and Q1–Q2 begin in the right column. All five options are grouped under 2021 Q8 below.

> **Completeness rule:** The examination papers say “Answer any five questions” or “short notes on any two”. Those directions apply to the examination candidate. This preparation document answers every readable question and every listed short-note option, including repeated questions from different years.

## Syllabus map

| Syllabus module | Main topics | PYQ themes mapped here |
|---|---|---|
| **Module 1 — Digital Image Fundamentals** | DIP steps and components, visual perception, sensing/acquisition, sampling, quantization, pixel relationships, colour models | DIP system, sampling/quantization, sensing, brightness, pixels, neighbours, distance, colour transformation |
| **Module 2 — Digital Image Formation** | Image model, translation, scaling, rotation, perspective projection, uniform/non-uniform sampling and quantization | Image transforms, interpolation, scaling, perspective projection, quantization |
| **Module 3 — Mathematical Preliminaries** | Neighbourhoods, connectivity, relations, equivalence and transitive closure, distance measures, arithmetic/logic operations, Fourier transform, DFT, DCT and DST | Pixel paths, logical operations, transitive closure, Fourier properties, DFT, DCT/DST, correlation and convolution |
| **Module 4 — Image Enhancement** | Gray-level transformations, histogram processing, spatial filters, smoothing/sharpening, frequency-domain filters including ideal, Butterworth and Gaussian | Histogram equalization, gray-level slicing, logarithmic transformation, spatial/frequency filtering, Gaussian and Butterworth filters, band-pass filters |
| **Module 5 — Image Restoration and Segmentation** | Noise models, mean/order-statistic/adaptive filters, band-reject/band-pass/notch filters, inverse/Wiener filtering, edge linking/boundary detection, region segmentation, erosion and dilation | Median and adaptive filtering, noise PDFs, restoration model, Wiener/notch filters, edge/boundary, region growing/split-merge, morphology |

**Syllabus note:** The supplied course outcomes explicitly mention image compression (CO3), although the five detailed module descriptions do not give a separate compression heading. Since compression appears in the 2022 PYQ, it is answered and labelled as a CO3-related topic. Image recognition by matching is also answered because it appears in the paper, but it is not a separately named detailed-module heading.

---

# 2025 Annual Examination

## Q1(a). Explain the process of image sampling and quantization. [7 marks]

### Answer
A digital image is produced from a continuous image by converting its spatial coordinates and intensity values into discrete values. This conversion has two main operations: **sampling** and **quantization**.

**1. Image sampling:** Sampling converts the continuous spatial coordinates  into a discrete grid. A continuous image is represented as \(f(x,y)\). Sampling measures it at regularly spaced positions \(x=m\Delta x\) and \(y=n\Delta y\), producing pixels \(f[m,n]\). The number of samples determines the spatial resolution. More samples generally preserve finer details, while too few samples cause loss of detail and aliasing.

**2. Image quantization:** Quantization converts each sampled intensity into one of a finite number of allowed gray levels. If an image uses \(b\) bits per pixel, the number of levels is \(L=2^b\). For example, an 8-bit grayscale image has 256 levels, from 0 (black) to 255 (white). Quantization introduces a small intensity error called quantization error; too few levels may produce false contouring.

**Example:** A continuous scene is sampled on a 512 × 512 grid and each sample is quantized to 8 bits. The result is a 512 × 512 digital grayscale image with 256 possible intensity values.

| Sampling | Quantization |
|---|---|
| Discretizes spatial coordinates | Discretizes intensity/amplitude |
| Controls spatial resolution | Controls gray-level resolution |
| Too low: aliasing and loss of detail | Too few levels: banding/false contouring |

**Conclusion:** Sampling determines where pixels are located, while quantization determines the intensity value stored for each pixel. Both are necessary to represent a continuous image digitally.

## Q1(b). Explain the elements of a digital image processing system with a proper diagram. [7 marks]

### Answer
A **digital image processing system** is a combination of hardware and software used to acquire, store, process, analyse and display digital images. The main elements are shown below.

```text
Scene / Object
      |
      v
Image Sensor + Digitizer
      |
      v
Specialized Image-Processing Hardware
      |
      v
Computer  <---->  Image-Processing Software
      |                       |
      v                       v
Mass Storage             Processing / Analysis
      |                       |
      +----------+------------+
                 v
       Image Display / Hardcopy
                 |
                 v
       Network / Image Sharing
```

1. **Image sensors:** A camera, scanner, X-ray detector or other sensor converts energy from a scene into an electrical signal.
2. **Digitizer:** Converts the sensor signal into digital samples by sampling and quantization.
3. **Specialized image-processing hardware:** Performs fast low-level operations, such as digitization, image acquisition and dedicated processing.
4. **Computer:** Controls the system and runs image-processing operations.
5. **Image-processing software:** Provides algorithms for enhancement, restoration, compression, segmentation, analysis and recognition.
6. **Mass storage:** Stores images and results. It may include short-term memory, online disks and archival storage.
7. **Image display:** Monitors and printers present the processed image to users.
8. **Hardcopy devices and networking:** Printers/film recorders create permanent copies, while networks transmit images to remote systems.

**Conclusion:** These elements work together to convert a physical scene into a digital image and produce useful visual information.

## Q2(a). Differentiate between image sensing and acquisition. [7 marks]

### Answer
**Image sensing** is the process of detecting energy reflected or emitted by an object and converting it into a measurable electrical signal. **Image acquisition** is the complete process of obtaining a digital image from that signal, including sensing, digitization and initial storage.

| Image sensing | Image acquisition |
|---|---|
| Detects energy from a scene | Produces a digital image from the detected signal |
| Mainly involves the sensor/detector | Includes sensor, optics, digitizer and acquisition hardware/software |
| Output is generally an electrical/analogue signal or sensor response | Output is a sampled and quantized pixel array |
| Depends on sensor sensitivity, spectral response and noise | Depends on sensing, sampling, quantization and calibration |
| Example: a CCD/CMOS photosite detects light | A camera converts sensor readings into a digital image file |

**Stages of acquisition:** (1) illumination or energy source, where required; (2) interaction of energy with the object; (3) optical system focuses the energy; (4) sensor converts energy into an electrical signal; (5) digitizer samples and quantizes the signal; and (6) the resulting pixel array is transferred to memory.

A sensing element may measure one point, while a sensor line or two-dimensional sensor array can capture many points. The acquisition arrangement depends on the application, such as a digital camera, satellite scanner or medical imaging device.

**Conclusion:** Sensing is the detection stage; acquisition is the broader process that converts detected information into a usable digital image.

## Q2(b). Explain Dynamic Range, Brightness, Hue, Saturation, Resolution and Pixel. [7 marks]

### Answer
1. **Dynamic range:** The ratio between the largest and smallest measurable signal or intensity levels that a sensor or imaging system can represent reliably. A large dynamic range allows details to be recorded in both bright and dark regions.
2. **Brightness:** The perceived intensity or lightness of an image. In a grayscale image, larger pixel values generally appear brighter.
3. **Hue:** The attribute that identifies the basic colour, such as red, green, blue or yellow. It is commonly represented as an angle in colour models such as HSV/HSI.
4. **Saturation:** The purity or vividness of a colour. A highly saturated colour appears strong, while low saturation approaches gray.
5. **Resolution:** The ability to distinguish fine spatial detail. Spatial resolution is related to the number and spacing of pixels; intensity resolution is related to the number of available gray levels.
6. **Pixel:** The smallest addressable picture element in a raster image. Each pixel stores a gray value or a set of colour-component values, such as red, green and blue.

**Example:** An 8-bit grayscale image has 256 possible intensity levels. A 1920 × 1080 image has 2,073,600 pixels. Its spatial resolution is 1920 × 1080, while its intensity resolution is 8 bits per pixel.

**Conclusion:** These terms describe the range, appearance, colour, detail and basic elements of a digital image.

## Q3(a). What is the need for transform and what is an Image Transform? [7 marks]

### Answer
An **image transform** converts an image from its original spatial representation into another mathematical domain or coordinate system. If the original image is \(f(x,y)\), a transform produces a representation \(F(u,v)\).

**Need for image transforms:**
1. **Simplify processing:** Some operations are easier in the transform domain than in the spatial domain.
2. **Frequency analysis:** Transforms separate slowly varying image components (low frequencies) from rapid changes and edges (high frequencies).
3. **Filtering:** Noise removal and sharpening can be performed by modifying selected frequency components.
4. **Compression:** Transforms such as DCT concentrate much of the image energy into a relatively small number of coefficients.
5. **Feature analysis:** Frequency and transform coefficients help describe texture, shape and image patterns.
6. **Geometric operations:** Coordinate transforms support translation, rotation, scaling and perspective mapping.

**Examples of transforms:**
- Fourier Transform (FT/DFT): represents an image in terms of spatial frequencies.
- Discrete Cosine Transform (DCT): widely used in JPEG image compression.
- Discrete Sine Transform (DST): represents data using sine basis functions.
- Geometric transforms: change the spatial coordinates of image points.

For a 2-D DFT, one common definition is:
\[
F(u,v)=\sum_{x=0}^{M-1}\sum_{y=0}^{N-1} f(x,y)e^{-j2\pi(ux/M+vy/N)}.
\]

**Conclusion:** Image transforms provide a useful representation for analysis, filtering, compression and geometric manipulation.

## Q3(b). What is interpolation? Explain briefly all types of interpolation. [7 marks]

### Answer
**Interpolation** estimates an image intensity at a position where no original pixel sample is available. It is required during resizing, rotation, warping and geometric transformation because transformed coordinates usually fall between existing pixels.

**1. Nearest-neighbour interpolation:** Selects the value of the closest existing pixel. It is simple and fast, but may produce blocky or jagged results.

**2. Bilinear interpolation:** Uses the four nearest pixels surrounding the required location. It performs linear interpolation first in one direction and then in the other. It produces smoother results than nearest-neighbour interpolation, but may blur fine details.

**3. Bicubic interpolation:** Uses a 4 × 4 neighbourhood (16 pixels) and cubic interpolation in two dimensions. It generally produces smoother and sharper results than bilinear interpolation, but requires more computation.

**4. Spline interpolation:** Uses piecewise polynomial functions to estimate missing values. Higher-order splines can provide smooth results, but require greater computation and careful boundary handling.

| Method | Neighbourhood | Main feature |
|---|---:|---|
| Nearest neighbour | 1 pixel | Fast; blocky output possible |
| Bilinear | 4 pixels | Smooth; may blur |
| Bicubic | 16 pixels | Better detail and smoothness; slower |
| Spline | Several samples | Smooth piecewise-polynomial estimate |

**Conclusion:** Nearest neighbour is fastest, bilinear gives moderate smoothness, and bicubic/spline methods usually provide better visual quality at greater computational cost.

## Q4(a). Discuss any four properties of 2-D Fourier Transform in detail. [7 marks]

### Answer
The two-dimensional Fourier Transform represents an image in the spatial-frequency domain. For an image \(f(x,y)\), its continuous transform is
\[
F(u,v)=\int_{-\infty}^{\infty}\int_{-\infty}^{\infty} f(x,y)e^{-j2\pi(ux+vy)}dxdy.
\]
Four important properties are:

1. **Linearity:** If \(g(x,y)=a f_1(x,y)+b f_2(x,y)\), then \(G(u,v)=aF_1(u,v)+bF_2(u,v)\). This means the transform of a weighted sum is the weighted sum of the transforms.
2. **Translation / spatial shifting:** If \(g(x,y)=f(x-x_0,y-y_0)\), then
\[
G(u,v)=F(u,v)e^{-j2\pi(ux_0+vy_0)}.
\]
A spatial shift changes phase but not the magnitude spectrum.
3. **Convolution:** Convolution in the spatial domain becomes multiplication in the frequency domain:
\[
f(x,y)*h(x,y)\ \longleftrightarrow\ F(u,v)H(u,v).
\]
This property is the basis of frequency-domain filtering.
4. **Multiplication:** Multiplication in the spatial domain corresponds to convolution in the frequency domain (with the transform's normalization factor). This is useful when analysing windowing and masking.
5. **Separability:** A 2-D transform can be computed by applying a 1-D transform along rows and then along columns. This reduces implementation complexity.

Other useful properties include conjugate symmetry for real images, scaling, rotation and the energy-preservation (Parseval) relation.

**Conclusion:** These properties make the Fourier Transform useful for image filtering, frequency analysis and efficient computation.

## Q4(b). Differentiate between Discrete Cosine Transform and Discrete Sine Transform. [7 marks]

### Answer
The **Discrete Cosine Transform (DCT)** and **Discrete Sine Transform (DST)** express a finite sequence or image block as a weighted sum of cosine or sine basis functions.

| DCT | DST |
|---|---|
| Uses cosine basis functions | Uses sine basis functions |
| Commonly corresponds to even-symmetric extension | Commonly corresponds to odd-symmetric extension |
| Represents data using cosine coefficients | Represents data using sine coefficients |
| Often concentrates image energy into a few low-frequency coefficients | Its coefficient distribution depends on boundary behaviour and data |
| Widely used in JPEG image compression | Used in selected numerical, signal and image-processing applications |
| Includes a strong DC (average) coefficient in common DCT forms | Standard DST bases do not contain the same cosine DC term |

For an 1-D DCT-II, a common form is
\[
X(k)=\alpha(k)\sum_{n=0}^{N-1}x(n)\cos\left[\frac{\pi(2n+1)k}{2N}\right].
\]
A DST uses sine terms, for example
\[
X(k)=\beta(k)\sum_{n=0}^{N-1}x(n)\sin\left[\frac{\pi(n+1)(k+1)}{N+1}\right],
\]
with normalization depending on the selected DST type.

**Applications:** DCT is widely used in JPEG and related compression standards because it efficiently compacts image energy. DST is useful when sine boundary conditions are appropriate and in some transform-based numerical methods.

**Conclusion:** Both are orthogonal transform families, but they use different basis functions and boundary assumptions; DCT has the more common role in image compression.

## Q5(a). What are the different types of redundancies in a digital image? Explain with examples. [7 marks]

### Answer
Image compression reduces the number of bits required to represent an image. It works by removing three major types of redundancy.

1. **Coding redundancy:** Occurs when image symbols are represented with more bits than necessary. It can be reduced using efficient variable-length codes such as Huffman coding. Example: frequent gray levels can be assigned shorter codes than rare gray levels.
2. **Interpixel (spatial) redundancy:** Occurs because neighbouring pixels are often highly correlated and have similar values. It can be reduced using predictive coding, run-length coding or transform coding. Example: a large area of a clear sky contains many nearby pixels with almost the same intensity.
3. **Psychovisual redundancy:** Occurs because the human visual system is less sensitive to some image information, such as small changes in certain high-frequency details or colour components. Lossy methods such as quantization in JPEG can remove some of this information with limited perceived quality loss.

| Type | Why it occurs | Common reduction method |
|---|---|---|
| Coding | Inefficient symbol codes | Huffman / arithmetic coding |
| Interpixel | Correlation between neighbouring pixels | Prediction / run-length / transforms |
| Psychovisual | Limited visual sensitivity | Quantization / chroma subsampling |

**Conclusion:** Coding redundancy is reduced by better codes, interpixel redundancy by exploiting correlation, and psychovisual redundancy by discarding less noticeable information.

## Q5(b). Define linear and non-linear spatial filters. [7 marks]

### Answer
A **spatial filter** processes an image by moving a small mask or neighbourhood over the image and calculating a new value for each pixel.

**1. Linear spatial filter:** The output is a weighted sum of the input pixels in the neighbourhood. If the mask is \(w(s,t)\), then
\[
g(x,y)=\sum_s\sum_t w(s,t)f(x-s,y-t).
\]
Examples include mean/averaging filters and many sharpening masks. A 3 × 3 averaging mask is
\[
\frac{1}{9}\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}.
\]
It smooths an image by averaging nearby values, but can blur edges.

**2. Non-linear spatial filter:** The output is obtained using a non-linear operation on the neighbourhood, rather than a weighted sum. Examples include median, maximum, minimum and adaptive median filters. A median filter sorts neighbourhood values and selects the middle value. It is effective for salt-and-pepper noise and often preserves edges better than a mean filter.

| Linear filter | Non-linear filter |
|---|---|
| Uses weighted sum | Uses a non-linear neighbourhood rule |
| Convolution-based implementation is common | Not generally represented by ordinary convolution |
| Mean and Laplacian masks are examples | Median, max and min filters are examples |

**Conclusion:** Linear filters are useful for smoothing and sharpening through weighted sums, while non-linear filters are useful when noise characteristics or edge preservation make averaging unsuitable.

## Q6(a). Compute the median of the following image using a 3 × 3 mask. [7 marks]

Given image:
\[
A=\begin{bmatrix}
18&22&33&25&32&24\\
34&128&24&172&26&23\\
22&19&32&31&28&26
\end{bmatrix}
\]

### Answer
A 3 × 3 median filter replaces the centre pixel of each 3 × 3 neighbourhood by the median (middle value) of its nine values. Since the image is 3 × 6, valid filtering without padding gives a 1 × 4 output row (one vertical position and four horizontal positions).

**Window 1:** Values = 18, 22, 33, 34, 128, 24, 22, 19, 32. Sorted = 18, 19, 22, 22, **24**, 32, 33, 34, 128. Median = 24.

**Window 2:** Values = 22, 33, 25, 128, 24, 172, 19, 32, 31. Sorted = 19, 22, 24, 25, **31**, 32, 33, 128, 172. Median = 31.

**Window 3:** Values = 33, 25, 32, 24, 172, 26, 32, 31, 28. Sorted = 24, 25, 26, 28, **31**, 32, 32, 33, 172. Median = 31.

**Window 4:** Values = 25, 32, 24, 172, 26, 23, 31, 28, 26. Sorted = 23, 24, 25, 26, **26**, 28, 31, 32, 172. Median = 26.

Therefore, the valid median-filter output is
\[
\boxed{[24\quad31\quad31\quad26]}.
\]

**Note:** Border pixels do not have a complete 3 × 3 neighbourhood. If the examiner expects a full-size output, a padding rule (replication, reflection or zero padding) must be specified; different padding rules can change border values.

## Q6(b). Explain histogram processing. [7 marks]

### Answer
An **image histogram** is a discrete frequency distribution showing how many pixels have each gray level. For an image with gray levels \(r_k\), the histogram is
\[
h(r_k)=n_k,
\]
where \(n_k\) is the number of pixels with gray level \(r_k\). The normalized histogram is \(p(r_k)=n_k/(MN)\), where the image size is \(M\times N\).

**Histogram processing** modifies or analyses this distribution to improve image appearance.

1. **Histogram stretching:** Expands a narrow intensity range to use a wider range, improving contrast.
2. **Histogram equalization:** Uses the cumulative distribution function (CDF) to redistribute gray levels and improve global contrast. For \(L\) levels, a common mapping is
\[
s_k=\operatorname{round}\left[(L-1)\sum_{j=0}^{k}p(r_j)\right].
\]
3. **Histogram specification/matching:** Transforms an image so that its histogram approximates a desired target histogram.
4. **Histogram statistics:** Mean, variance and other measures provide information about brightness and contrast.

**Applications:** Low-contrast medical images, satellite images, document enhancement and general contrast improvement.

**Limitation:** Equalization may over-enhance noise or change local brightness; adaptive/local histogram methods can be more appropriate when illumination varies spatially.

**Conclusion:** Histogram processing uses gray-level frequency information to analyse and improve image contrast.

## Q7(a). Explain adaptive filtering method of restoring images. Also discuss its advantages. [7 marks]

### Answer
An **adaptive filter** changes its behaviour according to local image statistics, such as local mean and variance. It is used in image restoration when noise characteristics or image details vary from one region to another.

For a local mean filter, let \(g(x,y)\) be the observed noisy image, \(\mu_L\) the local mean, \(\sigma_L^2\) the local variance, and \(\sigma_n^2\) the known or estimated noise variance. A common adaptive local noise-reduction estimator is
\[
\hat f(x,y)=g(x,y)-\frac{\sigma_n^2}{\sigma_L^2}\,[g(x,y)-\mu_L],
\]
when \(\sigma_L^2>0\). In practice the ratio is limited to a valid range to avoid unstable values.

**Working:**
1. Select a local window around the pixel.
2. Calculate local mean and variance.
3. Estimate the noise variance.
4. Compare local variance with noise variance.
5. In a nearly uniform region, reduce noise strongly; in a region with high local variance (likely edges or texture), preserve more of the original pixel value.
6. Move the window over the image and repeat.

**Advantages:** (i) adapts to local image conditions; (ii) smooths uniform regions; (iii) preserves edges and details better than fixed averaging; (iv) useful when noise level varies; and (v) can reduce noise without applying the same amount of smoothing everywhere.

**Conclusion:** Adaptive filtering balances noise removal and detail preservation by using local statistics rather than a fixed filter response.

## Q7(b). Define image segmentation. Explain Region Growing and Split-and-Merge methods. [7 marks]

### Answer
**Image segmentation** divides an image into meaningful, non-overlapping regions or objects whose pixels share properties such as intensity, colour or texture. It simplifies image analysis by separating objects from the background.

### 1. Region Growing
Region growing is a region-based method that starts with one or more seed pixels and adds neighbouring pixels that satisfy a similarity condition.

**Steps:** (i) select seed pixels; (ii) examine their 4- or 8-neighbours; (iii) compare intensity, colour or texture with the region criterion; (iv) add similar pixels; (v) update region statistics; and (vi) stop when no eligible neighbour remains. It is useful for extracting connected objects, but depends on seed selection and threshold choice.

### 2. Split-and-Merge
This method starts with the whole image as one region. If a region does not satisfy a homogeneity predicate, it is split into smaller parts, commonly four quadrants (quadtree splitting). Adjacent regions are then merged if their combined region satisfies the homogeneity condition.

**Steps:** (i) test the whole image; (ii) split non-homogeneous regions; (iii) repeat until regions satisfy the criterion or reach a minimum size; (iv) test neighbouring regions; and (v) merge compatible regions.

| Region growing | Split-and-merge |
|---|---|
| Starts with seeds | Starts with the whole image |
| Grows by adding similar neighbours | Splits non-homogeneous regions and merges similar neighbours |
| Sensitive to seed selection | Sensitive to homogeneity predicate and block structure |

**Conclusion:** Both methods form regions using similarity; region growing is seed-driven, while split-and-merge uses recursive subdivision and merging.

## Q8. Short notes — answer all four options (the paper asks any two).

### (a) Wiener Filtering
Wiener filtering is an image-restoration technique that estimates the original image from a degraded noisy observation. It uses the degradation function and the power spectra of the original image and noise. In the frequency domain, a common Wiener filter is
\[
W(u,v)=\frac{H^*(u,v)}{|H(u,v)|^2+S_\eta(u,v)/S_f(u,v)},
\]
where \(H\) is the degradation transfer function, \(H^*\) its complex conjugate, \(S_\eta\) the noise power spectrum and \(S_f\) the original-image power spectrum. The restored image is \(\hat F=W G\). It balances deblurring and noise suppression and minimizes mean-square error under the model assumptions. It requires estimates of degradation and noise statistics.

### (b) Butterworth Filter
A Butterworth low-pass filter reduces high-frequency components while retaining low-frequency information. Its transfer function is
\[
H(u,v)=\frac{1}{1+[D(u,v)/D_0]^{2n}},
\]
where \(D(u,v)\) is distance from the frequency origin, \(D_0\) is the cutoff frequency and \(n\) is filter order. A higher order gives a sharper transition. A Butterworth filter has a smoother transition than an ideal filter and generally produces less ringing. A high-pass Butterworth filter is obtained by complementing the low-pass response.

### (c) Gray-Level Transformation
Gray-level transformation is a point operation that maps an input intensity \(r\) to an output intensity \(s=T(r)\). It changes contrast or highlights selected intensity ranges. Common transforms include image negative \(s=L-1-r\), logarithmic transform \(s=c\log(1+r)\), power-law transform \(s=cr^\gamma\), contrast stretching and gray-level slicing. It is used to enhance dark details, correct brightness and emphasize selected gray-level ranges.

### (d) Edge Linking and Boundary Detection
Edge detection identifies pixels where image intensity changes sharply, often using gradient operators such as Sobel or the Laplacian. The detected edge pixels may be disconnected because of noise or weak contrast. **Edge linking** joins nearby edge pixels using local gradient direction, magnitude and continuity. **Boundary detection** identifies a closed or meaningful contour separating an object from its background. These operations support segmentation, object measurement and recognition.

---

# 2024 Annual Examination

## Q1(a). What is Digital Image Processing? Explain with image-processing components. [7 marks]

### Answer
**Digital Image Processing (DIP)** is the use of computer algorithms to operate on digital images for improvement, restoration, analysis, compression and interpretation. A digital image is a two-dimensional array of pixels, each having a finite intensity or colour value.

Main components of a general-purpose DIP system are:
1. **Image sensor and digitizer:** Capture energy from a scene and convert the signal into a digital pixel array by sampling and quantization.
2. **Specialized processing hardware:** Performs fast acquisition and low-level processing.
3. **Computer:** Controls operations and executes algorithms.
4. **Image-processing software:** Provides enhancement, restoration, compression, segmentation and recognition methods.
5. **Mass storage:** Stores raw images, intermediate data and final results.
6. **Display:** Presents images on a monitor.
7. **Hardcopy and networking:** Printers/film devices produce physical copies; networks transfer images.

```text
Scene -> Sensor -> Digitizer -> Computer / Image-processing software
                                  |       |
                                  v       v
                              Storage  Processing
                                  \       /
                                   Display
                                      |
                            Hardcopy / Network
```

**Applications:** Medical diagnosis, satellite imaging, industrial inspection, document processing, security and photography.

**Conclusion:** DIP converts acquired pixel data into useful visual information through hardware, software, storage and output devices.

## Q1(b). Explain the relationship of pixels and colour models. [7 marks]

### Answer
A **pixel** is the smallest addressable element of a digital raster image. Its position is represented by coordinates \((x,y)\), and its value represents gray intensity or colour components. Relationships between pixels are important for describing neighbourhoods, connectivity, boundaries and regions.

For a pixel \(p=(x,y)\):
- **4-neighbours:** \((x-1,y),(x+1,y),(x,y-1),(x,y+1)\).
- **Diagonal neighbours:** \((x-1,y-1),(x-1,y+1),(x+1,y-1),(x+1,y+1)\).
- **8-neighbours:** all 4-neighbours and diagonal neighbours.
- **Adjacency and connectivity:** define whether pixels are connected based on their neighbourhood and allowed value set.

A **colour model** is a method of representing colours using numerical components:
1. **RGB:** Red, green and blue components; commonly used in displays and cameras.
2. **CMY/CMYK:** Cyan, magenta, yellow (and black); commonly used in printing.
3. **HSI/HSV:** Hue, saturation and intensity/value; separates colour type and purity from brightness, useful for colour analysis.

In an RGB image each pixel stores a triplet, such as \((255,0,0)\) for red. In a grayscale image, it stores one intensity value. Colour distance may be measured in a suitable colour space, but equal numerical distances in RGB do not always correspond to equal perceived colour differences.

**Conclusion:** Pixel values describe local image data; neighbourhood relations describe spatial structure, while colour models specify how colour information is encoded.

## Q1(c). Explain in short sampling and quantization method for digital image. [7 marks]

### Answer
A continuous image \(f(x,y)\) becomes digital through sampling and quantization.

**Sampling** discretizes spatial coordinates. The image is measured on a grid with intervals \(\Delta x\) and \(\Delta y\), producing a finite number of rows and columns. The number of samples determines spatial resolution. Insufficient sampling can cause aliasing, jagged edges and loss of small details.

**Quantization** discretizes intensity values. Each sampled value is assigned to one of a finite set of levels. If \(b\) bits are used per pixel, there are \(L=2^b\) possible levels. For example, 8-bit grayscale has 256 levels.

**Methods:** Uniform quantization divides the intensity range into equal intervals. Non-uniform quantization uses unequal intervals, allocating finer levels where greater accuracy is needed. Sampling can be uniform on a regular grid or non-uniform according to a non-uniform measurement pattern.

**Effect:** Higher spatial sampling preserves finer structures; higher intensity resolution gives smoother tonal variation. Low sampling creates spatial distortion, while low quantization creates banding or false contouring.

**Conclusion:** Sampling determines image size and spatial detail; quantization determines the number and precision of intensity levels.

## Q1(d). Justify/contradict: “All image compression techniques are invertible.” [7 marks]

### Answer
The statement is **false**. Not all image-compression techniques are invertible. Image compression is classified into lossless and lossy methods.

**1. Lossless compression:** The original image can be reconstructed exactly from the compressed data. No information is discarded. Examples include Run-Length Coding (RLC), Huffman coding, arithmetic coding, LZW and PNG compression. These methods are useful for medical, scientific and document images where exact reconstruction may be required.

**2. Lossy compression:** Some image information is discarded to achieve a higher compression ratio. The reconstructed image is only an approximation of the original. Examples include JPEG with quantization and many transform-based methods. Lossy compression may remove less noticeable detail or colour information.

| Lossless | Lossy |
|---|---|
| Exact reconstruction | Approximate reconstruction |
| Reversible mapping of data | Generally non-invertible after information is discarded |
| Lower compression ratio in many image cases | Often higher compression ratio |
| PNG, lossless coding | JPEG lossy mode |

**Conclusion:** Only lossless compression is exactly reversible. Lossy compression is not invertible because discarded information cannot be recovered exactly; therefore the statement is contradicted.

## Q2(a). Differentiate between image sensing and acquisition. [7 marks]

### Answer
**Image sensing** is detection of energy from an object or scene by a sensor. **Image acquisition** is the complete process of capturing that information and producing a digital image.

| Image sensing | Image acquisition |
|---|---|
| Detects reflected or emitted energy | Converts sensor response into a digital image |
| Performed by a sensor/detector | Includes optics, sensor, signal conditioning and digitizer |
| Produces a sensor signal or measurement | Produces sampled and quantized pixel values |
| Concerned with sensitivity and spectral response | Concerned with the complete capture pipeline and image quality |

The acquisition process includes: (1) energy source/object interaction, where applicable; (2) optical or imaging system; (3) sensor detection; (4) electrical signal generation; (5) sampling of spatial coordinates; (6) quantization of signal amplitude; and (7) transfer to memory for processing.

Examples of sensing devices are CCD/CMOS cameras, scanners, X-ray detectors and satellite sensors. A camera's light-sensitive elements perform sensing; the camera electronics and software perform acquisition and save a digital image.

**Conclusion:** Sensing is one part of acquisition. Acquisition includes sensing plus digitization and preparation of the image for computer processing.

## Q2(b). Explain smoothing of images in frequency domain using ideal, Butterworth and Gaussian low-pass filters. [7 marks]

### Answer
Frequency-domain smoothing reduces high-frequency components, which commonly represent fine details, sharp transitions and noise, while retaining low-frequency components associated with slowly varying image information.

**Steps:** (1) Pad the image if required; (2) multiply by \((-1)^{x+y}\) to centre the transform; (3) compute the 2-D DFT \(F(u,v)\); (4) multiply by low-pass transfer function \(H(u,v)\); (5) compute inverse DFT; and (6) undo centring and crop to the required size.

Let \(D(u,v)\) be distance from the frequency origin and \(D_0\) the cutoff frequency.

**1. Ideal low-pass filter (ILPF):**
\[
H(u,v)=\begin{cases}1,&D(u,v)\le D_0\\0,&D(u,v)>D_0.\end{cases}
\]
It completely passes frequencies inside the cutoff and rejects those outside. Its sharp transition can produce ringing (Gibbs phenomenon).

**2. Butterworth low-pass filter (BLPF):**
\[
H(u,v)=\frac{1}{1+[D(u,v)/D_0]^{2n}}.
\]
The order \(n\) controls transition sharpness. It gives a smoother transition than an ideal filter and usually less ringing.

**3. Gaussian low-pass filter (GLPF):**
\[
H(u,v)=e^{-D^2(u,v)/(2D_0^2)}.
\]
It has a smooth bell-shaped response and produces little or no ringing compared with a sharp ideal cutoff.

**Conclusion:** All three smooth images by attenuating high frequencies; Gaussian gives the smoothest transition, Butterworth offers adjustable sharpness, and ideal filtering has an abrupt cutoff.

## Q3(a). Explain in brief the properties of two-dimensional Fourier Transform. [7 marks]

### Answer
For a continuous image \(f(x,y)\), the 2-D Fourier Transform is
\[
F(u,v)=\int\!\int f(x,y)e^{-j2\pi(ux+vy)}dxdy.
\]
Its inverse reconstructs the image from its frequency representation. Important properties are:

1. **Linearity:** \(a f_1+b f_2\leftrightarrow aF_1+bF_2\).
2. **Translation:** Shifting the image in space multiplies its transform by a phase factor, but does not change the magnitude spectrum.
3. **Conjugate symmetry:** For a real-valued image, \(F(-u,-v)=F^*(u,v)\). This symmetry can be used to check transform results.
4. **Convolution theorem:** Spatial convolution becomes multiplication in frequency: \(f*h\leftrightarrow FH\). This is central to filtering.
5. **Multiplication theorem:** Multiplication in space corresponds to convolution in frequency, apart from the transform normalization factor.
6. **Separability:** A 2-D transform can be calculated by applying 1-D transforms to rows and then columns.
7. **Parseval's theorem:** Energy in the spatial domain equals appropriately normalized energy in the frequency domain.

**Conclusion:** These properties make the 2-D Fourier Transform a powerful tool for filtering, frequency analysis and image restoration.

## Q3(b). Describe arithmetic and logic operations with suitable examples. [7 marks]

### Answer
Arithmetic and logical operations are pixel-wise operations performed on one or more images. The images generally must have compatible dimensions and data ranges.

**Arithmetic operations:**
1. **Addition:** \(g(x,y)=f_1(x,y)+f_2(x,y)\). Used to combine images, average repeated noisy images or brighten an image. Values must be clipped or rescaled to the allowed range.
2. **Subtraction:** \(g=f_1-f_2\). Used for change detection, background removal and highlighting differences.
3. **Multiplication:** \(g=f\cdot m\). Multiplying by a mask can isolate a region or change intensity.
4. **Division:** \(g=f_1/f_2\), where denominator values are non-zero; used in shading correction and normalization.

**Logical operations:** These are commonly applied to binary images or masks.
- **AND:** Keeps pixels that are 1 in both images; useful for intersection of masks.
- **OR:** Keeps pixels that are 1 in either image; useful for combining regions.
- **NOT:** Inverts a binary image (0 becomes 1 and 1 becomes 0).
- **XOR:** Produces 1 where the inputs differ; useful for detecting differences.

**Example:** If mask A selects an object and mask B selects a region of interest, \(A\ AND\ B\) retains only the selected object pixels lying inside that region.

**Conclusion:** Arithmetic operations modify image intensity values; logical operations combine or compare binary regions and masks.

## Q4(a). Differentiate between Discrete Cosine Transform and Discrete Sine Transform. [7 marks]

### Answer
The DCT and DST are discrete orthogonal transforms that represent a finite signal using cosine and sine basis functions respectively.

| DCT | DST |
|---|---|
| Uses cosine basis functions | Uses sine basis functions |
| Commonly associated with even-symmetric extension | Commonly associated with odd-symmetric extension |
| Has a DC/average coefficient in common DCT forms | Has no equivalent constant cosine basis term in standard DST forms |
| Strong energy compaction for many natural image blocks | Useful for data and boundary conditions suited to sine bases |
| Widely used in JPEG image compression | Used in numerical methods and selected signal/image applications |

A common DCT-II form is
\[
X(k)=\alpha(k)\sum_{n=0}^{N-1}x(n)\cos\left[\frac{\pi(2n+1)k}{2N}\right],
\]
where \(\alpha(k)\) is a normalization factor. DST variants use sine basis functions; several DST types exist, so their exact formula and endpoint assumptions differ.

The DCT is especially useful in image compression because much of the energy of a typical image block is concentrated in a small number of low-frequency coefficients. The DST is selected when its sine basis and boundary assumptions are suitable.

**Conclusion:** Both transforms convert data into coefficients, but differ in basis functions, symmetry assumptions and common applications.

## Q4(b). Explain the basic model of image restoration. Explain any four important noise probability density functions. [7 marks]

### Answer
**Image restoration** attempts to recover an original image from a degraded observation using a mathematical model of the degradation.

The basic degradation model is
\[
g(x,y)=h(x,y)*f(x,y)+\eta(x,y),
\]
where \(f(x,y)\) is the original image, \(h(x,y)\) is the degradation/blur function, \(*\) denotes convolution, \(\eta(x,y)\) is additive noise, and \(g(x,y)\) is the observed degraded image. Restoration estimates \(f\) using knowledge or estimates of blur and noise.

Four important noise probability density functions (PDFs) are:

**1. Gaussian noise:**
\[
p(z)=\frac{1}{\sqrt{2\pi}\sigma}e^{-(z-\mu)^2/(2\sigma^2)}.
\]
It has a bell-shaped distribution and often models sensor/electronic noise.

**2. Uniform noise:**
\[
p(z)=\frac{1}{b-a},\quad a\le z\le b,
\]
and zero otherwise. All values in the interval are equally likely.

**3. Rayleigh noise:**
\[
p(z)=\frac{2}{b}(z-a)e^{-(z-a)^2/b},\quad z\ge a,
\]
for suitable parameters. It is asymmetric and can model certain imaging processes.

**4. Exponential noise:**
\[
p(z)=a e^{-az},\quad z\ge0,
\]
where \(a>0\). It decreases exponentially as noise amplitude increases.

Other models include Erlang/Gamma and salt-and-pepper (impulse) noise. **Conclusion:** Restoration uses a degradation model and statistical noise knowledge to estimate the original image.

## Q5(a). What are the different types of redundancies in a digital image? Explain in detail giving examples. [7 marks]

### Answer
Image redundancy means that some stored bits do not contribute unique information. Compression reduces three main types:

1. **Coding redundancy:** Occurs when symbols use unnecessarily long codewords. Variable-length codes, such as Huffman coding, assign shorter codes to frequent symbols. Example: a common gray level may be represented with fewer bits than a rare level.
2. **Interpixel redundancy:** Occurs because nearby pixels are often correlated. Predictive coding and run-length coding exploit this. Example: a large uniform sky area contains long runs of similar pixel values.
3. **Psychovisual redundancy:** Occurs because the human visual system is less sensitive to some details. Lossy compression can remove selected high-frequency or colour details with limited visible effect. JPEG uses transform coding and quantization to exploit this redundancy.

| Redundancy | Source | Typical method |
|---|---|---|
| Coding | Inefficient code lengths | Huffman / arithmetic coding |
| Interpixel | Neighbouring-pixel correlation | Prediction / RLE / transform coding |
| Psychovisual | Limited visual sensitivity | Quantization / chroma subsampling |

Lossless compression removes coding and some interpixel redundancy without losing information. Lossy compression also removes psychovisually less important information.

**Conclusion:** Removing these redundancies reduces storage and transmission requirements while controlling reconstructed-image quality.

## Q5(b). Draw the block diagram for converting gray-level intensity to colour transformation and explain it. [7 marks]

### Answer
**Pseudocolour (intensity-to-colour) transformation** assigns colours to gray-level intensities in a grayscale image. It helps the human eye distinguish intensity ranges that may look similar in grayscale.

```text
Grayscale input image f(x,y)
          |
          v
Read gray-level value r
          |
          v
Colour mapping / lookup table
       /      |      \
      v       v       v
  R=T_R(r) G=T_G(r) B=T_B(r)
       \      |      /
          v
   Combine RGB components
          |
          v
    Pseudocolour image
```

**Working:**
1. Take the grayscale image with levels from 0 to \(L-1\).
2. For each input intensity \(r\), use a colour map or three transformation functions \(T_R(r)\), \(T_G(r)\) and \(T_B(r)\).
3. Generate the red, green and blue output components.
4. Combine the three components to form the colour pixel.

**Methods:**
- **Intensity slicing:** Divide the gray range into intervals and assign a distinct colour to each interval.
- **Continuous colour mapping:** Map each input intensity smoothly to an RGB triplet using lookup tables or mathematical functions.

**Applications:** Medical scans, thermal images, satellite images and scientific data visualization.

**Conclusion:** Gray-to-colour transformation does not create new scene information; it displays existing intensity differences in a form that may be easier to interpret.

## Q6(a). Explain erosion and dilation operations used for morphological processing. [7 marks]

### Answer
**Morphological processing** analyses or modifies the shape of objects in binary or grayscale images using a small pattern called a **structuring element (SE)**.

**1. Erosion:** Erosion shrinks foreground objects. For a binary image set \(A\) and structuring element \(B\),
\[
A\ominus B=\{z\mid B_z\subseteq A\}.
\]
A foreground pixel remains only when the translated structuring element fits completely inside the foreground. Erosion removes small objects, separates narrow connections and reduces object boundaries.

**2. Dilation:** Dilation expands foreground objects. A common set definition is
\[
A\oplus B=\{z\mid (\hat B)_z\cap A\ne\emptyset\},
\]
where \(\hat B\) is the reflected structuring element. Dilation adds pixels around boundaries, fills small gaps and connects nearby components.

| Erosion | Dilation |
|---|---|
| Shrinks foreground | Expands foreground |
| Removes small protrusions | Fills small holes/gaps |
| Can break thin connections | Can join close components |

**Applications:** Noise removal, shape analysis, object separation, boundary extraction and document processing. Opening is erosion followed by dilation; closing is dilation followed by erosion.

**Conclusion:** Erosion and dilation are basic shape-processing operations whose effects depend on the structuring element.

## Q6(b). Explain histogram processing. [7 marks]

### Answer
A histogram counts the number of image pixels at each gray level. If \(n_k\) pixels have level \(r_k\), the normalized histogram is \(p(r_k)=n_k/(MN)\).

Histogram processing uses this distribution to change or analyse image contrast.

1. **Histogram equalization:** Uses the cumulative distribution to map the original gray levels to a more spread-out range:
\[
s_k=\operatorname{round}\left[(L-1)\sum_{j=0}^{k}p(r_j)\right].
\]
It often improves global contrast.
2. **Histogram specification:** Maps an image to approximate a chosen target histogram.
3. **Contrast stretching:** Expands a narrow range of gray levels to a wider range.
4. **Histogram statistics:** Mean estimates average brightness; variance measures contrast/spread.

**Applications:** Improving low-contrast images, medical image viewing, remote sensing and document analysis. Global equalization may over-enhance noise or fail with uneven illumination; local/adaptive histogram methods can help in such cases.

**Conclusion:** Histogram processing modifies or interprets the distribution of pixel intensities to improve image quality.

## Q7(a). Explain Wiener filtering in image processing. [7 marks]

### Answer
Wiener filtering is a statistical image-restoration method that estimates the original image from a blurred and noisy observation. It is designed to minimize the mean-square error between the estimated image and the true image.

The degradation model in the frequency domain is
\[
G(u,v)=H(u,v)F(u,v)+N(u,v),
\]
where \(F\) is the original image, \(H\) is the degradation function and \(N\) is noise.

The Wiener filter is commonly written as
\[
W(u,v)=\frac{H^*(u,v)}{|H(u,v)|^2+S_N(u,v)/S_F(u,v)},
\]
where \(H^*\) is the complex conjugate of \(H\), \(S_N\) is the noise power spectrum and \(S_F\) is the original-image power spectrum. The estimate is \(\hat F=WG\).

**Working:** (i) obtain the degraded image; (ii) estimate blur and noise characteristics; (iii) transform the image into the frequency domain; (iv) multiply by the Wiener filter; (v) take the inverse transform to obtain the restored image.

**Advantages:** reduces blur and noise together, balances restoration and noise amplification, and is optimal in the mean-square sense under its statistical assumptions. **Limitation:** it requires estimates of the degradation function and signal/noise spectra.

**Conclusion:** Wiener filtering provides a principled balance between deblurring and noise suppression.

## Q7(b). Explain adaptive filtering method of restoring images. List its advantages. [7 marks]

### Answer
An adaptive filter changes its response according to local image statistics. It is useful when some regions are smooth and others contain edges or texture.

For adaptive local noise reduction, let \(g(x,y)\) be the observed pixel, \(\mu_L\) the local mean, \(\sigma_L^2\) the local variance and \(\sigma_n^2\) the noise variance. A common estimator is
\[
\hat f(x,y)=g(x,y)-\frac{\sigma_n^2}{\sigma_L^2}[g(x,y)-\mu_L],
\]
for positive local variance, with practical safeguards on the ratio.

**Working:** (1) select a local window; (2) calculate local mean and variance; (3) estimate noise variance; (4) compare local variance with noise variance; (5) smooth strongly in uniform areas and preserve more of the original pixel in high-variance areas; (6) repeat across the image.

**Advantages:** adapts to spatially varying noise, smooths uniform regions, preserves edges better than fixed averaging, and reduces unnecessary blurring of textured regions.

**Conclusion:** Adaptive filtering uses local statistics to achieve a compromise between noise removal and detail preservation.

## Q8(a). Differentiate between Band-Pass Filter and Band-Reject Filter. [7 marks]

### Answer
A **band-pass filter (BPF)** passes a selected band of spatial frequencies and attenuates frequencies below and above that band. A **band-reject filter (BRF)** does the opposite: it suppresses a selected band and passes frequencies outside it.

| Band-pass filter | Band-reject filter |
|---|---|
| Passes frequencies between lower and upper cutoffs | Rejects frequencies between lower and upper cutoffs |
| Suppresses low and high frequencies outside its pass band | Passes low and high frequencies outside its stop band |
| Isolates selected frequency range or texture | Removes periodic interference in a selected frequency band |
| Useful for emphasizing selected patterns | Useful for suppressing unwanted periodic components |

For a radial frequency distance \(D(u,v)\), a band is defined by centre frequency \(D_0\) and width \(W\). A band-pass response is high inside the selected interval; a band-reject response is low inside that interval. Ideal, Butterworth and Gaussian forms can be designed.

**Applications:** BPF can extract a desired texture/frequency range; BRF can remove repetitive noise or unwanted bands.

**Conclusion:** BPF retains a chosen band; BRF removes that band. Their responses are complementary in the ideal case.

## Q8(b). What is image segmentation? Explain Region Growing and Split-and-Merge. [7 marks]

### Answer
Image segmentation divides an image into meaningful regions based on similarity of intensity, colour or texture.

**Region growing:** Starts from one or more seed pixels. Their neighbours are examined and added if they satisfy a similarity rule, such as a gray-level difference below a threshold. The process continues until no eligible neighbour remains. It creates connected regions but depends on seed selection and the threshold.

**Split-and-merge:** Starts with the whole image as one region. If it fails a homogeneity test, it is recursively split, often into four quadrants. After splitting, adjacent regions are merged when their combined data satisfy the homogeneity rule. A quadtree is commonly used to represent the subdivision.

| Region growing | Split-and-merge |
|---|---|
| Starts from seed pixels | Starts from whole image |
| Adds similar neighbouring pixels | Splits inhomogeneous regions and merges homogeneous neighbours |
| Depends on seeds and growth criterion | Depends on homogeneity predicate and subdivision |

**Conclusion:** Both methods form meaningful regions by testing pixel/region similarity, but use different strategies.

---

# 2023 Annual Examination

## Q1(a). What is quantization in image processing? [7 marks]

### Answer
Quantization is the process of converting a continuous or high-precision intensity value into one of a finite number of discrete gray levels. After spatial sampling, each sample may still have a continuous amplitude; quantization assigns it to an allowed digital value.

If an image uses \(b\) bits per pixel, the number of available levels is
\[
L=2^b.
\]
For an 8-bit grayscale image, \(L=256\), usually numbered 0 to 255. A quantizer maps each input intensity to the nearest representative level. The difference between the original sample and assigned level is the quantization error.

**Uniform quantization** uses equal-width intensity intervals. **Non-uniform quantization** uses unequal intervals, allocating more levels to important ranges or ranges where the signal changes frequently.

Too few quantization levels produce visible bands called false contouring. More bits per pixel generally give better intensity resolution but require more storage.

**Conclusion:** Quantization makes image intensity values digital and finite; the number and distribution of levels affect image quality and storage.

## Q1(b). What are the steps in Digital Image Processing? [7 marks]

### Answer
The main steps of Digital Image Processing are:

1. **Image acquisition:** Capture an image using a sensor and convert it into digital form by sampling and quantization.
2. **Image enhancement:** Improve visual appearance, such as contrast stretching, smoothing or sharpening.
3. **Image restoration:** Recover an image degraded by blur or noise using mathematical models.
4. **Colour image processing:** Process colour information using colour models and colour transformations.
5. **Wavelets and multiresolution processing:** Represent images at different scales or resolutions.
6. **Compression:** Reduce the number of bits required for storage or transmission.
7. **Morphological processing:** Analyse shapes and structures, commonly using erosion and dilation.
8. **Segmentation:** Divide an image into regions or objects.
9. **Representation and description:** Represent segmented regions and extract features such as boundary, area, shape and texture.
10. **Recognition and interpretation:** Assign labels to objects and interpret their meaning.

The steps are not always a strictly one-way sequence. A system may repeat or combine several steps depending on the task.

**Conclusion:** DIP progresses from image capture and improvement to segmentation, feature extraction and interpretation.

## Q2(a). Compare image sampling and quantization. [7 marks]

### Answer
Sampling and quantization are the two main operations used to convert a continuous image into a digital image.

| Sampling | Quantization |
|---|---|
| Discretizes spatial coordinates | Discretizes intensity values |
| Determines number of rows and columns | Determines number of gray levels |
| Controls spatial resolution | Controls intensity resolution |
| Low sampling causes aliasing and loss of fine detail | Low quantization causes false contouring/banding |
| Example: 512 × 512 samples | Example: 8 bits = 256 gray levels |

**Sampling:** A continuous image \(f(x,y)\) is measured at discrete positions on a grid to form \(f[m,n]\). The spacing between samples determines the spatial sampling density.

**Quantization:** Each sampled value is mapped to a finite intensity level. With \(b\) bits, \(L=2^b\) levels are available.

**Example:** A camera first samples the scene into a 640 × 480 grid and then quantizes each sample to 8 bits. The stored grayscale image has 307,200 pixels and 256 possible levels.

**Conclusion:** Sampling determines pixel locations; quantization determines the value stored at each location.

## Q2(b). Describe geometric transformation of image processing. [7 marks]

### Answer
A **geometric transformation** changes the spatial position of image pixels. It is used for translation, scaling, rotation, reflection, registration and perspective correction.

A point \((x,y)\) is mapped to a new point \((x',y')\). Using homogeneous coordinates:
\[
\begin{bmatrix}x'\\y'\\1\end{bmatrix}=T\begin{bmatrix}x\\y\\1\end{bmatrix}.
\]

**1. Translation:** Moves an image by \((t_x,t_y)\):
\[
x'=x+t_x,\quad y'=y+t_y.
\]
**2. Scaling:** Changes size:
\[
x'=s_xx,\quad y'=s_yy.
\]
If \(s_x,s_y>1\), the image is enlarged; if values are below 1, it is reduced.
**3. Rotation:** Rotates by angle \(\theta\) about the origin:
\[
x'=x\cos\theta-y\sin\theta,\quad y'=x\sin\theta+y\cos\theta.
\]
**4. Reflection/shearing:** Reflection flips an image about an axis; shearing slants it by shifting coordinates in proportion to the other coordinate.
**5. Perspective projection:** Uses a projective mapping to represent depth and perspective effects; parallel lines may converge.

After transformation, interpolation is needed because mapped positions may not coincide with integer pixel coordinates.

**Conclusion:** Geometric transformations change image geometry; interpolation supplies intensity values at newly mapped locations.

## Q3(a). Explain the different logical operations performed on an image. [7 marks]

### Answer
Logical operations are pixel-wise Boolean operations, commonly applied to binary images or masks. Let binary images be \(A(x,y)\) and \(B(x,y)\).

1. **AND:** Output is 1 only when both input pixels are 1. It is used to select the intersection of two regions.
2. **OR:** Output is 1 when at least one input pixel is 1. It combines two masks or regions.
3. **NOT:** Inverts the binary value: 0 becomes 1 and 1 becomes 0. It produces the complement of a mask.
4. **XOR:** Output is 1 when the two input pixels differ. It is useful for highlighting differences between binary images.

| A | B | AND | OR | XOR |
|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

**Example:** If A is an object mask and B is a region-of-interest mask, AND keeps only object pixels located inside the region of interest. NOT can create the background mask.

**Conclusion:** Logical operations combine, intersect, complement or compare image regions and are important in masking and segmentation.

## Q3(b). Describe the Discrete Fourier Transform (DFT). [7 marks]

### Answer
The **Discrete Fourier Transform (DFT)** converts a finite digital signal or image from the spatial domain into the frequency domain. It describes the image as a sum of discrete frequency components.

For an \(M\times N\) image \(f(x,y)\), the 2-D DFT is
\[
F(u,v)=\sum_{x=0}^{M-1}\sum_{y=0}^{N-1}f(x,y)e^{-j2\pi(ux/M+vy/N)}.
\]
The inverse DFT is
\[
f(x,y)=\frac{1}{MN}\sum_{u=0}^{M-1}\sum_{v=0}^{N-1}F(u,v)e^{j2\pi(ux/M+vy/N)}.
\]

**Meaning:** Low frequencies represent slowly varying intensity, while high frequencies represent rapid changes, fine detail and edges. The magnitude \(|F(u,v)|\) indicates the strength of frequency components; phase contains spatial-position information.

**Properties:** linearity, translation, conjugate symmetry for real images, separability, periodicity, convolution theorem and Parseval's theorem.

**Applications:** Frequency-domain smoothing and sharpening, periodic-noise removal, image analysis and transform-based compression.

**Conclusion:** DFT provides a discrete frequency representation and allows filtering by modifying selected frequency components before applying the inverse DFT.

## Q4(a). Discuss Gaussian filters. [7 marks]

### Answer
A **Gaussian filter** is a smoothing filter whose weights follow a Gaussian distribution. Nearby pixels receive larger weights than distant pixels, so it reduces noise while producing a smooth result.

The 2-D Gaussian function is
\[
G(x,y)=\frac{1}{2\pi\sigma^2}\exp\left[-\frac{x^2+y^2}{2\sigma^2}\right],
\]
where \(\sigma\) controls the spread of the filter. A finite kernel is created by sampling and normalizing this function.

**Spatial-domain Gaussian smoothing:** Convolve the image with the Gaussian kernel. A larger \(\sigma\) gives stronger smoothing and more blur. Gaussian filtering is separable, so a 2-D operation can be implemented as successive 1-D horizontal and vertical filtering.

**Frequency-domain Gaussian low-pass filter:**
\[
H(u,v)=\exp\left[-\frac{D^2(u,v)}{2D_0^2}\right],
\]
where \(D(u,v)\) is distance from the frequency origin and \(D_0\) controls the cutoff spread.

**Advantages:** smooth transition, effective reduction of Gaussian-like noise, no abrupt frequency cutoff and little ringing. **Limitation:** it blurs edges and fine details when strong smoothing is used.

**Applications:** pre-processing before edge detection, noise reduction and scale-space analysis.

**Conclusion:** Gaussian filters provide smooth, controllable low-pass filtering in spatial or frequency domains.

## Q4(b). Explain gray-level slicing in digital image processing. [7 marks]

### Answer
**Gray-level slicing** is an enhancement technique that highlights a selected range of gray levels in an image. It is used when objects of interest occupy a known intensity interval.

Let the selected range be \([A,B]\). Two common approaches are:

1. **Slicing with background suppression:** Set pixels with intensities in \([A,B]\) to a high value and set all other pixels to a low value. This makes the selected range stand out strongly.
2. **Slicing without background suppression:** Enhance pixels in \([A,B]\) but preserve the intensity values of pixels outside the range. This highlights the target range without discarding surrounding image information.

A simple mapping is
\[
g(x,y)=\begin{cases}L-1,&A\le f(x,y)\le B\\0,&\text{otherwise,}
\end{cases}
\]
for background suppression. For the second method, values outside the interval remain unchanged.

**Example:** In a medical image, a range of gray levels corresponding to a tissue type can be highlighted for easier visual examination.

**Applications:** medical images, satellite images, thermal images and detection of specific materials.

**Conclusion:** Gray-level slicing emphasizes a chosen intensity interval and makes important structures easier to observe.

## Q5(a). Explain adaptive filters. [7 marks]

### Answer
An adaptive filter changes its operation according to local image properties such as local mean and variance. Unlike a fixed filter, it adjusts the amount of smoothing at different locations.

For adaptive local noise reduction, let \(g(x,y)\) be the observed noisy pixel, \(\mu_L\) the local mean, \(\sigma_L^2\) the local variance and \(\sigma_n^2\) the noise variance. A commonly used estimator is
\[
\hat f(x,y)=g(x,y)-\frac{\sigma_n^2}{\sigma_L^2}[g(x,y)-\mu_L],
\]
for positive local variance, using suitable safeguards in implementation.

**Working:** (1) choose a local window; (2) calculate local mean and variance; (3) estimate noise variance; (4) compare local and noise variance; (5) smooth more in uniform regions and preserve more detail in high-variance regions; and (6) repeat for every pixel.

**Advantages:** adapts to local conditions, reduces noise in smooth areas, preserves edges better than fixed averaging, and is useful when noise varies across an image.

**Conclusion:** Adaptive filters use local statistics to reduce noise while limiting unnecessary blur.

## Q5(b). What is region-based segmentation? [7 marks]

### Answer
**Region-based segmentation** partitions an image into connected regions whose pixels satisfy a similarity or homogeneity property, such as similar gray level, colour or texture.

Common methods include:
1. **Region growing:** Begins with seed pixels and adds neighbouring pixels that satisfy a similarity condition. It continues until no eligible neighbours remain.
2. **Region splitting:** Divides a region that fails a homogeneity test into smaller subregions, often using a quadtree.
3. **Region merging:** Combines adjacent regions if their combined pixels satisfy the homogeneity condition.
4. **Split-and-merge:** Uses both splitting and merging to create a consistent partition.

A region predicate may be based on intensity range, variance, colour difference or texture. For example, neighbouring pixels may be assigned to the same region if their intensity difference from the region mean is below a threshold.

**Advantages:** uses region similarity rather than only local edge strength and can produce connected objects. **Limitations:** performance depends on seeds, thresholds and the selected homogeneity rule.

**Applications:** medical image segmentation, satellite-image analysis and object extraction.

**Conclusion:** Region-based methods form meaningful objects by grouping connected, similar pixels.

## Q6(a). What is the meaning of boundary detection? [7 marks]

### Answer
**Boundary detection** is the process of locating the contour that separates an object or region from its background or neighbouring regions. A boundary is a set of pixels representing the outer limit of a region.

Boundaries are often found by detecting image discontinuities:
1. **First-derivative/gradient methods:** Compute intensity changes in horizontal and vertical directions. Operators such as Roberts, Prewitt and Sobel estimate gradient magnitude and direction. Large gradient values indicate possible edges.
2. **Second-derivative methods:** The Laplacian detects rapid intensity changes and zero crossings; it is often combined with smoothing to reduce noise sensitivity.
3. **Thresholding:** Select candidate edge pixels based on gradient magnitude.
4. **Edge linking:** Connect compatible edge pixels to form longer contours.
5. **Boundary validation:** Use continuity, closure and region information to distinguish true object boundaries from noise.

**Applications:** object measurement, shape recognition, segmentation and medical imaging.

**Conclusion:** Boundary detection identifies object contours by locating and connecting significant intensity transitions.

## Q6(b). Why is edge linking required in image processing? [7 marks]

### Answer
Edge detection produces individual edge pixels or short edge fragments. Because of noise, illumination changes, weak contrast and imperfect thresholds, the detected pixels may not form complete contours. **Edge linking** joins compatible edge fragments to form meaningful continuous edges.

**Why it is required:**
1. Detected edges may contain gaps.
2. Noise can create isolated false edge pixels.
3. Weak boundaries may be broken into several fragments.
4. Object recognition and measurement often require continuous boundaries.
5. Linking helps distinguish meaningful contours from unrelated edge responses.

**Methods:**
- **Local processing:** Compare gradient magnitude and direction in neighbouring pixels. Pixels with similar direction and sufficient strength are linked.
- **Global processing:** Use methods such as the Hough transform to identify curves or lines supported by many edge points.
- **Graph/contour methods:** Connect candidate pixels based on continuity, proximity and orientation.

**Example:** A circular object may produce small separated edge segments. Edge linking joins them into a near-closed contour so that the object can be measured.

**Conclusion:** Edge linking converts fragmented edge detections into continuous boundaries needed for reliable segmentation and recognition.

## Q7(a). Write a short note on transitive closure. [7 marks]

### Answer
A **relation** \(R\) on a set is transitive if whenever \((a,b)\in R\) and \((b,c)\in R\), then \((a,c)\in R\). The **transitive closure** of a relation is the smallest transitive relation containing the original relation.

In image processing, relations can represent pixel connectivity. If one pixel is connected to a second and the second to a third, transitive closure identifies that the first and third belong to the same connected component through a path.

**Example:** Let pixels/vertices be \(A,B,C\), with relation \(R=\{(A,B),(B,C)\}\). The transitive closure adds \((A,C)\), giving \(R^+=\{(A,B),(B,C),(A,C)\}\) for this simple directed relation.

For a finite relation represented by an adjacency matrix, transitive closure can be computed using Warshall's algorithm. It repeatedly checks whether a path from \(i\) to \(j\) exists through an intermediate vertex \(k\).

**Applications:** connected-component analysis, region connectivity, graph reachability and determining whether two pixels are connected by a permitted path.

**Conclusion:** Transitive closure captures all indirect reachability relationships implied by a relation.

## Q7(b). What does scaling do to an image? [7 marks]

### Answer
**Scaling** is a geometric transformation that changes the size of an image by multiplying its coordinates by scale factors.

For scale factors \(s_x\) and \(s_y\):
\[
x'=s_xx,\qquad y'=s_yy.
\]
- If both factors are greater than 1, the image is enlarged.
- If both are between 0 and 1, the image is reduced.
- If the factors are unequal, the image is stretched or compressed differently in the horizontal and vertical directions.

Using homogeneous coordinates:
\[
S=\begin{bmatrix}s_x&0&0\\0&s_y&0\\0&0&1\end{bmatrix}.
\]

After scaling, output pixel locations may not map exactly to input pixel locations. Interpolation such as nearest neighbour, bilinear or bicubic interpolation estimates the required intensity values.

**Effects:** Scaling changes spatial resolution and apparent object size. Enlarging may reveal pixelation if interpolation is poor; reducing may lose fine detail due to downsampling. Anti-aliasing or low-pass filtering before reduction can reduce aliasing.

**Conclusion:** Scaling resizes an image, and interpolation/resampling determines the visual quality of the result.

## Q8(a). Discuss the function of notch filter. [7 marks]

### Answer
A **notch filter** is a frequency-domain filter that rejects or attenuates a small selected region around one or more specific frequency points while allowing most other frequencies to pass.

It is mainly used to remove periodic noise. Periodic interference often appears as distinct bright spots in the Fourier magnitude spectrum, usually in symmetric pairs for real-valued images.

**Working:**
1. Compute the Fourier Transform of the noisy image and centre the spectrum.
2. Inspect the magnitude spectrum to locate unwanted periodic-noise peaks.
3. Design notch-reject regions around the peaks and their symmetric locations.
4. Multiply the transform by the notch-reject transfer function.
5. Apply the inverse Fourier Transform to obtain the filtered image.

Notch filters may be ideal, Butterworth or Gaussian. A notch-pass filter can retain selected frequency points while suppressing others.

**Applications:** removal of electrical interference, repetitive scanning patterns and periodic textures. **Limitation:** if a notch overlaps genuine image frequencies, useful image detail may also be removed.

**Conclusion:** Notch filters selectively suppress periodic noise at known frequency locations.

## Q8(b). What are the different types of noise models in digital image processing? [7 marks]

### Answer
Noise is an unwanted random variation in image intensity introduced during sensing, transmission or processing. Common statistical noise models include:

1. **Gaussian noise:** Bell-shaped distribution with mean \(\mu\) and standard deviation \(\sigma\). Often associated with electronic sensor noise.
2. **Rayleigh noise:** Asymmetric distribution, used in some imaging and statistical models.
3. **Erlang/Gamma noise:** A distribution controlled by shape and scale parameters; useful in modelling certain signal-dependent noise processes.
4. **Exponential noise:** A one-sided distribution with exponentially decreasing probability.
5. **Uniform noise:** All noise values in a finite interval are equally likely.
6. **Impulse (salt-and-pepper) noise:** Some pixels are replaced by very low (pepper) or very high (salt) values, often due to faulty sensors or transmission errors.

For example, Gaussian PDF is
\[
p(z)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left[-\frac{(z-\mu)^2}{2\sigma^2}\right].
\]
Uniform PDF is \(1/(b-a)\) for \(a\le z\le b\). Impulse noise is represented by probability masses at low and high intensity values.

**Conclusion:** Identifying the noise model helps select a suitable restoration filter, such as median filtering for impulse noise or statistical filtering for Gaussian noise.

---

# 2022 Annual Examination

## Q1(a). What is Digital Image Processing? Explain the components of an image-processing system. [7 marks]

### Answer
Digital Image Processing is the use of computer algorithms to manipulate and analyse images represented as finite arrays of pixels. It includes enhancement, restoration, compression, segmentation and recognition.

A general-purpose image-processing system contains:
1. Image sensor and digitizer — capture the scene and convert it to digital pixels.
2. Specialized processing hardware — performs fast low-level operations.
3. Computer — controls the system and executes algorithms.
4. Image-processing software — implements enhancement, restoration, segmentation and analysis.
5. Mass storage — stores image data and results.
6. Display — shows processed images.
7. Hardcopy devices — create permanent printed images.
8. Network — transfers images and results to remote locations.

```text
Scene -> Sensor -> Digitizer -> Computer + Processing Software
                                |         |
                                v         v
                             Storage   Algorithms
                                \         /
                               Display / Printer
                                      |
                                    Network
```

**Conclusion:** A DIP system combines acquisition, computing, software, storage and output components to turn captured scenes into useful image information.

## Q1(b). Discuss the effects of sampling and quantization. [7 marks]

### Answer
**Sampling** determines the number and spacing of pixels. **Quantization** determines the number of intensity levels available to represent each sampled pixel.

**Effects of sampling:**
- Higher sampling density increases spatial resolution and helps preserve small details.
- Low sampling can cause aliasing, jagged edges and loss of thin structures.
- Nyquist sampling principles state that sampling must be sufficiently high relative to the highest spatial frequency to avoid aliasing; practical systems often use anti-aliasing filters.

**Effects of quantization:**
- More quantization levels give better intensity resolution and smoother tonal transitions.
- Too few levels produce visible bands called false contouring.
- Quantization introduces an error between the true sample and its assigned digital level.

| Sampling | Quantization |
|---|---|
| Affects spatial detail | Affects intensity detail |
| Related to pixels per dimension | Related to bits per pixel |
| Low rate causes aliasing | Few levels cause banding |

**Example:** A 256 × 256 image with 8 bits per pixel has fewer spatial samples than a 1024 × 1024 image, but both may represent 256 gray levels. The larger image can preserve more spatial detail.

**Conclusion:** Image quality depends on both spatial sampling and intensity quantization.

## Q2. Compute the shortest 4-, 8- and m-path between P and Q if V={1,2}. Explain if a particular path does not exist. [14 marks]

### Answer
The given 4 × 4 image is
\[
\begin{bmatrix}
3&1&2&1(Q)\\
2&2&0&2\\
1&2&1&1\\
1(P)&0&1&2
\end{bmatrix}
\]
Only pixels with values in \(V=\{1,2\}\) may be used in a path. Pixels with values 0 and 3 are blocked. The length of a path is the number of links between successive pixels.

Coordinates below are written as (row, column).

**1. Shortest 4-path:** Under 4-adjacency, only horizontal and vertical neighbours are permitted. One shortest path is
\[
(4,1)\to(3,1)\to(2,1)\to(2,2)\to(1,2)\to(1,3)\to(1,4).
\]
This path contains **6 links**, so its length is 6.

**2. Shortest 8-path:** Under 8-adjacency, diagonal neighbours are also permitted. One shortest path is
\[
(4,1)\to(3,2)\to(2,2)\to(1,3)\to(1,4).
\]
All listed pixels have values 1 or 2. It contains **4 links**, so the shortest 8-path length is 4.

**3. Shortest m-path (mixed adjacency):** Two diagonal pixels are m-adjacent only when their common 4-neighbours contain no pixel whose value belongs to V. This condition prevents ambiguous diagonal connections.
A shortest m-path is
\[
(4,1)\to(3,1)\to(2,1)\to(2,2)\to(1,2)\to(1,3)\to(1,4).
\]
Its length is **6 links**. The tempting diagonal from (4,1) to (3,2) is not allowed because they share the 4-neighbour (3,1), whose value is 1 and therefore belongs to V. The diagonal from (2,2) to (1,3) is also not permitted because their common 4-neighbour (1,2) belongs to V.

| Path type | Shortest path length | Reason |
|---|---:|---|
| 4-path | 6 | Only horizontal/vertical moves |
| 8-path | 4 | Diagonal moves are allowed |
| m-path | 6 | Diagonals blocked when a common 4-neighbour is in V |

**Conclusion:** A valid path exists for all three adjacency definitions. The 8-path is shortest because it can use diagonals; m-adjacency avoids certain ambiguous diagonal shortcuts.

## Q3. Perform histogram equalization of the image. [14 marks]

Given:

| Gray level \(r_k\) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Number of pixels \(n_k\) | 6 | 8 | 11 | 12 | 3 | 5 | 15 | 6 |

### Answer
Total number of pixels:
\[
N=6+8+11+12+3+5+15+6=66.
\]
There are \(L=8\) gray levels (0 to 7). Histogram equalization uses the cumulative distribution function (CDF):
\[
s_k=\operatorname{round}\left[(L-1)\sum_{j=0}^{k}\frac{n_j}{N}\right]
=\operatorname{round}\left[7\frac{\text{cumulative count}}{66}\right].
\]

| \(r_k\) | Count \(n_k\) | Cumulative count | \(7\times\text{CDF}\) | Mapped level (nearest integer) |
|---:|---:|---:|---:|---:|
| 0 | 6 | 6 | 0.636 | 1 |
| 1 | 8 | 14 | 1.485 | 1 |
| 2 | 11 | 25 | 2.652 | 3 |
| 3 | 12 | 37 | 3.924 | 4 |
| 4 | 3 | 40 | 4.242 | 4 |
| 5 | 5 | 45 | 4.773 | 5 |
| 6 | 15 | 60 | 6.364 | 6 |
| 7 | 6 | 66 | 7.000 | 7 |

Therefore the equalization mapping is:
\[
0\to1,\;1\to1,\;2\to3,\;3\to4,\;4\to4,\;5\to5,\;6\to6,\;7\to7.
\]
The equalized histogram is obtained by combining counts that map to the same output level:

| Output level | 1 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|
| Number of pixels | 14 | 11 | 15 | 5 | 15 | 6 |

**Note:** Some texts use floor/truncation instead of nearest-integer rounding. The mapping can differ by one gray level; the convention used here is rounding to the nearest integer, stated explicitly.

**Conclusion:** Histogram equalization remaps gray levels using the CDF to spread the available intensity range and improve contrast.

## Q4. Given \(p_r(r)=\frac{2r}{(L-1)^2}\), for \(0\le r\le L-1\), calculate \(p_s(s)\), where \(p_s(s)=p_r(r)(dr/ds)\). [14 marks]

### Answer
For continuous histogram equalization, the transformed intensity is
\[
s=(L-1)\int_0^r p_r(w)\,dw.
\]
Given
\[
p_r(r)=\frac{2r}{(L-1)^2},\quad 0\le r\le L-1.
\]
Substitute:
\[
s=(L-1)\int_0^r\frac{2w}{(L-1)^2}\,dw
=\frac{1}{L-1}[w^2]_0^r
=\frac{r^2}{L-1}.
\]
Therefore,
\[
r=\sqrt{s(L-1)}.
\]
Differentiate with respect to \(s\):
\[
\frac{dr}{ds}=\frac{L-1}{2r}.
\]
Using the given relation,
\[
p_s(s)=p_r(r)\frac{dr}{ds}
=\frac{2r}{(L-1)^2}\times\frac{L-1}{2r}
=\boxed{\frac{1}{L-1}}.
\]
The result is constant for \(0\le s\le L-1\), and zero outside the range. Thus the transformed intensity has a uniform probability density.

**Conclusion:** The specified input density becomes uniform after the continuous histogram-equalization transformation.

## Q5(a). What is the need for image compression? Explain image-compression standards in detail. [7 marks]

### Answer
Image compression reduces the number of bits needed to store or transmit an image. Digital images may be large, and compression saves storage, bandwidth and transmission time.

**Need for compression:**
1. Reduces storage requirements.
2. Reduces network bandwidth and transmission time.
3. Makes image databases and sharing more efficient.
4. Reduces cost in large-scale image systems.
5. Supports real-time or mobile applications.

**Main methods:**
- **Lossless compression:** Reconstructs the original image exactly; examples include run-length coding, Huffman coding, LZW and PNG.
- **Lossy compression:** Removes selected information to obtain higher compression; examples include JPEG and lossy JPEG 2000.

**Common standards/formats:**
1. **JPEG:** Uses block-based DCT, quantization and entropy coding. It is widely used for photographs; standard lossy JPEG is not exactly reversible.
2. **JPEG 2000:** Uses wavelet-based coding and supports both lossy and lossless modes, progressive transmission and region-of-interest coding.
3. **PNG:** Uses lossless filtering and DEFLATE compression; suitable for graphics, text and images requiring exact reconstruction.
4. **GIF:** Uses palette-based colour (up to 256 colours per frame) and LZW lossless coding for indexed-colour images and simple animation.
5. **TIFF:** A flexible image-file container that can support several compression options, including uncompressed, lossless and other schemes.

**Conclusion:** Compression improves storage and transmission efficiency. The choice of standard depends on image type and whether exact reconstruction is required.

## Q5(b). Explain image recognition based on matching. [7 marks]

### Answer
**Image recognition based on matching** identifies an object by comparing its image or extracted features with stored templates or reference patterns.

**Basic steps:**
1. **Acquire image:** Capture the input image.
2. **Pre-process:** Remove noise, normalize brightness, resize and align the image where required.
3. **Extract a region or features:** Identify the object and obtain its pixel pattern, edges, shape or other descriptors.
4. **Select template:** Retrieve a stored reference image or feature representation.
5. **Match:** Compare the input with the template using a similarity/distance measure.
6. **Decision:** Choose the best match if its score exceeds a threshold; otherwise report no reliable match.

A common method is correlation. For image \(f\) and template \(w\), a correlation score is calculated at different positions; a high score indicates strong similarity. Normalized cross-correlation is often used to reduce sensitivity to overall brightness and contrast. Other measures include sum of absolute differences (SAD) and sum of squared differences (SSD).

**Applications:** character recognition, industrial inspection, face/object matching and medical image comparison.

**Limitations:** basic template matching is sensitive to rotation, scale, illumination and occlusion unless normalization or multiple templates are used.

**Conclusion:** Matching recognizes an object by measuring similarity between an input pattern and stored reference patterns.

## Q6(a). Explain region-based segmentation technique. [7 marks]

### Answer
Region-based segmentation divides an image into connected regions whose pixels satisfy a similarity condition such as intensity, colour or texture.

**Main techniques:**
1. **Region growing:** Select seed pixels and add neighbouring pixels whose values satisfy a homogeneity test. Continue until no suitable neighbour remains.
2. **Region splitting:** Start with the complete image and divide a region when it fails a homogeneity condition, often into four equal quadrants.
3. **Region merging:** Merge adjacent regions when their combined pixels satisfy the similarity condition.
4. **Split-and-merge:** Combines recursive splitting with merging to obtain consistent regions.

A predicate may test whether the intensity range, mean difference or variance is below a threshold. For example, pixels may be grouped when their gray levels differ from the region mean by less than a selected threshold.

**Advantages:** forms connected regions, uses regional properties and can work when boundaries are weak. **Limitations:** depends on seed selection, thresholds and the homogeneity criterion.

**Applications:** medical-image analysis, satellite imagery and object extraction.

**Conclusion:** Region-based segmentation groups pixels into meaningful connected areas using similarity criteria.

## Q6(b). Explain in detail the method for smoothing the image in frequency domain. [7 marks]

### Answer
Frequency-domain smoothing is performed using a low-pass filter. It attenuates high-frequency components, which often represent noise and fine details, while allowing low-frequency components to pass.

**Procedure:**
1. Pad the image if necessary to reduce circular-convolution effects.
2. Multiply by \((-1)^{x+y}\) to centre the Fourier spectrum.
3. Compute the 2-D DFT \(F(u,v)\).
4. Construct a low-pass transfer function \(H(u,v)\).
5. Multiply: \(G(u,v)=H(u,v)F(u,v)\).
6. Apply inverse DFT.
7. Undo centring and crop to the original image size.

**Common filters:**
- Ideal LPF: \(H=1\) for \(D\le D_0\), otherwise 0.
- Butterworth LPF: \(H=1/[1+(D/D_0)^{2n}]\).
- Gaussian LPF: \(H=e^{-D^2/(2D_0^2)}\).

Here \(D\) is distance from the frequency origin and \(D_0\) is the cutoff frequency. Ideal filters have abrupt cutoff and can cause ringing; Butterworth filters have adjustable transition; Gaussian filters have a smooth response.

**Conclusion:** Frequency-domain low-pass filtering smooths images by removing or reducing high-frequency components.

## Q7(a). Explain in detail any two boundary representation schemes and illustrate with example. [7 marks]

### Answer
Boundary representation describes the outer contour of a segmented object in a compact form. Two common schemes are **chain codes** and **polygonal approximation**.

**1. Chain code:** Represents a boundary as a sequence of directions between neighbouring boundary pixels. In a 4-direction code, directions may be numbered 0–3; in an 8-direction code, 0–7. Starting from a boundary pixel, each next boundary pixel is encoded by its direction from the previous pixel.

Example (8-direction convention): moving right, down-right, down and left might be encoded as `0, 7, 6, 4` depending on the chosen numbering. The numbering convention must be stated because systems differ. Chain codes preserve boundary connectivity and are compact for digital contours. They can be sensitive to rotation and starting point unless normalized.

**2. Polygonal approximation:** Approximates a boundary by a sequence of straight-line segments joining selected points (vertices). Redundant points are removed while keeping the approximation error within a tolerance. For example, a nearly circular boundary may be represented by a polygon with several vertices.

**Advantages:** Chain codes preserve pixel-level direction changes; polygonal approximation gives a simpler geometric description and reduces data.

**Conclusion:** Both schemes represent object boundaries compactly, but chain codes use directional sequences while polygonal approximation uses line segments.

## Q7(b). Calculate full correlation, cropped correlation and convolution if 1-D function is 00010000 and W is 12328. [7 marks]

### Answer
Interpret the given sequences as
\[
f=[0,0,0,1,0,0,0,0],\qquad w=[1,2,3,2,8].
\]
The question does not specify a correlation lag/centering convention. The following uses the common discrete signal convention: correlation is computed without reversing the template, convolution reverses the second sequence, and cropped (valid) correlation includes only positions where the entire 5-sample template overlaps the signal.

**1. Full correlation:** Using \(r_{fw}[k]=\sum_n f[n]w[n-k]\), with zero-padding, the impulse in \(f\) selects the reversed template values in the full lag sequence. The 12-sample full result, ordered from lag \(-4\) to lag \(7\), is
\[
\boxed{[0,0,0,8,2,3,2,1,0,0,0,0]}.
\]

**2. Cropped (valid) correlation:** Slide the un-reversed template across the signal where all five template positions overlap. The four dot products are 2, 3, 2 and 1:
\[
\boxed{[2,3,2,1]}.
\]

**3. Full convolution:** Convolution reverses \(w\) before sliding. Since \(f\) is a unit impulse at its fourth position, the convolution is the filter sequence shifted to that position:
\[
\boxed{[0,0,0,1,2,3,2,8,0,0,0,0]}.
\]

**Note:** Some image-processing texts define correlation with the opposite lag sign or use “cropped” to mean a centred output of the original signal length. The numerical sequence can appear reversed or shifted under those conventions. In an exam, state the convention and show the overlap/dot-product table.

---

## Q8. Short notes — answer all four options (the paper asks any two).

### (a) Gray-Level Slicing
Gray-level slicing highlights a specified intensity interval \([A,B]\). In background-suppression slicing, values inside the interval are set to a high output and values outside to a low output. In the second form, values in the interval are enhanced while the remaining pixels retain their original values. It helps highlight selected tissues, materials or objects in medical, satellite and industrial images.

### (b) Run-Length Coding (RLC)
Run-Length Coding is a lossless compression method that represents consecutive repetitions of the same value as a pair consisting of the value and the run length. For example, `AAAAABBCC` can be represented as `(A,5)(B,2)(C,2)`. It is efficient for binary images, document images and images with large uniform regions. It is less effective when adjacent pixels change frequently.

### (c) Histogram
An image histogram gives the number of pixels at each gray level. The normalized histogram is \(p(r_k)=n_k/(MN)\). It indicates brightness and contrast distribution. Histograms are used for contrast stretching, histogram equalization, histogram matching and image analysis.

### (d) Logarithmic Transformation
The logarithmic transform is a gray-level point transformation:
\[
s=c\log(1+r),
\]
where \(r\) is input intensity and \(c\) is a scaling constant. It expands low intensity values and compresses high intensity values. It is useful for displaying Fourier spectra and revealing details in dark regions. The output must be scaled to the display range.

---

# 2021 Annual Examination

## Q1(a). With the help of a neat diagram explain the components of a general-purpose image-processing system. [7 marks]

### Answer
A general-purpose Digital Image Processing system contains hardware and software for acquiring, processing, storing and displaying digital images.

```text
Scene -> Image Sensor -> Digitizer -> Computer
                                   /    |    \
                                  v     v     v
                              Software Storage Display
                                  |             |
                                  v             v
                             Processing     Hardcopy
                                  \             /
                                     Network
```

1. **Image sensor:** Detects energy from the scene and converts it into an electrical signal.
2. **Digitizer:** Performs sampling and quantization to create a digital image.
3. **Specialized hardware:** Performs fast acquisition and low-level processing.
4. **Computer:** Controls the system and executes algorithms.
5. **Software:** Implements enhancement, restoration, compression, segmentation and recognition.
6. **Mass storage:** Stores images, intermediate results and databases.
7. **Display and hardcopy:** Show results on monitors or create printed images.
8. **Networking:** Transfers images to other systems or users.

**Conclusion:** The components work together to capture a scene and produce a digital image suitable for processing and interpretation.

## Q1(b). Explain the concept of image sampling and quantization with a proper example. [7 marks]

### Answer
Sampling and quantization convert a continuous image into a digital image.

**Sampling** discretizes spatial coordinates. A continuous image \(f(x,y)\) is measured at regularly spaced positions, producing a grid of pixels. The number of samples controls spatial resolution.

**Quantization** converts each sampled intensity into a finite number of levels. If \(b\) bits are used per pixel, \(L=2^b\) levels are available.

**Example:** A 4 × 4 image contains 16 spatial samples. If each pixel is quantized using 3 bits, each sample has \(2^3=8\) possible intensity levels (0–7). The image contains 16 pixels, each represented by one of 8 levels.

Low sampling can produce aliasing and loss of fine structures. Low quantization can produce false contouring or banding. Increasing sampling improves spatial detail; increasing bits per pixel improves intensity precision but increases storage.

**Conclusion:** Sampling selects pixel locations; quantization assigns the digital intensity value to each pixel.

## Q2(a). Explain the concept of brightness adaptation and discrimination in image processing. [7 marks]

### Answer
The human visual system can operate over a wide range of illumination, but it cannot perceive all intensity levels equally at the same time. Two important concepts are **brightness adaptation** and **brightness discrimination**.

**Brightness adaptation:** The eye adjusts its sensitivity according to the average illumination level. When moving from a bright area to a dark area, the eye gradually becomes more sensitive to low light; when moving into a bright area, sensitivity decreases. The range of intensities perceived at one time is much smaller than the total range to which the eye can adapt.

**Brightness discrimination:** It is the ability to distinguish a small intensity change between two regions. It depends on the background intensity and is often described by Weber's law:
\[
\frac{\Delta I}{I}=k,
\]
where \(I\) is background intensity, \(\Delta I\) is the just-noticeable intensity change and \(k\) is a constant over a limited range.

**Importance in image processing:** These concepts explain why contrast enhancement, gray-level transformations and perceptually designed quantization are useful. A small intensity change may be visible in a dark region but less noticeable in a bright region.

**Conclusion:** Brightness adaptation concerns adjustment of visual sensitivity; brightness discrimination concerns detecting intensity differences.

## Q2(b). Explain smoothing of images in frequency domain using Ideal, Butterworth and Gaussian low-pass filters. [7 marks]

### Answer
Frequency-domain smoothing attenuates high spatial frequencies, which often represent noise and fine details, while retaining low frequencies.

**Procedure:** (1) Pad and centre the image; (2) calculate its 2-D DFT; (3) multiply by a low-pass transfer function; (4) compute the inverse DFT; (5) undo centring and crop the output.

Let \(D(u,v)\) be distance from the origin and \(D_0\) the cutoff.

- **Ideal LPF:** \(H=1\) for \(D\le D_0\), otherwise 0. It has a sharp cutoff and may produce ringing.
- **Butterworth LPF:** \(H=1/[1+(D/D_0)^{2n}]\). The order \(n\) controls the sharpness of the transition.
- **Gaussian LPF:** \(H=e^{-D^2/(2D_0^2)}\). It has a smooth response and generally produces little ringing.

All three filters blur fine details as they suppress high frequencies. The ideal filter has the abruptest transition; Gaussian has the smoothest; Butterworth is adjustable.

**Conclusion:** Low-pass filtering in the frequency domain reduces high-frequency noise and detail to produce a smoother image.

## Q3(a). Explain the process of brightness adaptation and discrimination in image processing. [7 marks]

### Answer
Brightness adaptation is the eye's ability to adjust its sensitivity to different overall illumination levels. Brightness discrimination is the ability to detect a difference between two nearby intensity values.

**Brightness adaptation:** In a dark environment the eye becomes more sensitive, while in a bright environment sensitivity decreases. This allows vision over a large overall illumination range, although only a limited range can be distinguished clearly at one time.

**Brightness discrimination:** The smallest detectable change in intensity is called the just-noticeable difference (JND). Weber's law approximates the relationship:
\[
\Delta I/I=k,
\]
where \(I\) is the background intensity and \(\Delta I\) is the minimum noticeable change.

**Example:** A small intensity increase may be easy to notice on a dark background but difficult to notice on a very bright background. Image enhancement uses this principle to improve contrast in selected ranges.

**Conclusion:** Adaptation changes visual sensitivity with illumination, while discrimination describes the ability to distinguish intensity differences. These concepts influence image contrast and gray-level design.

## Q3(b). Explain the following terms: (i) False contouring (ii) Checkerboard effect (iii) Neighbours of pixel (iv) Distance measure. [7 marks]

### Answer
**(i) False contouring:** False contouring is the appearance of artificial bands or contours in an image when a smooth intensity variation is represented using too few quantization levels. It can be reduced by increasing bit depth or using suitable dithering.

**(ii) Checkerboard effect:** The checkerboard effect refers to a block-like alternating pattern or visible grid artefact that may arise from coarse sampling, block-based processing or inappropriate interpolation. In image resampling, insufficient sampling or block boundaries can create an artificial tiled appearance.

**(iii) Neighbours of a pixel:** For pixel \(p=(x,y)\), the 4-neighbours are \((x-1,y),(x+1,y),(x,y-1),(x,y+1)\). Diagonal neighbours are \((x\pm1,y\pm1)\). The 8-neighbourhood contains all eight positions.

**(iv) Distance measure:** A distance measure quantifies separation between pixels. For \(p=(x,y)\), \(q=(s,t)\):
- Euclidean: \(D_E=\sqrt{(x-s)^2+(y-t)^2}\).
- City-block (D4): \(D_4=|x-s|+|y-t|\).
- Chessboard (D8): \(D_8=\max(|x-s|,|y-t|)\).

**Conclusion:** These terms describe visual artefacts and the spatial relationships used in digital image analysis.

## Q4(a). Perform histogram equalization of a 5 × 5 image. [7 marks]

Given gray-level histogram:

| Gray level | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Number of pixels | 0 | 0 | 0 | 6 | 14 | 5 | 0 | 0 |

### Answer
Total pixels \(N=25\); number of gray levels \(L=8\). Use
\[
s_k=\operatorname{round}\left[7\frac{\text{cumulative pixel count}}{25}\right].
\]

| Input level | Count | Cumulative count | Scaled CDF | Output level |
|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0.00 | 0 |
| 1 | 0 | 0 | 0.00 | 0 |
| 2 | 0 | 0 | 0.00 | 0 |
| 3 | 6 | 6 | 1.68 | 2 |
| 4 | 14 | 20 | 5.60 | 6 |
| 5 | 5 | 25 | 7.00 | 7 |
| 6 | 0 | 25 | 7.00 | 7 |
| 7 | 0 | 25 | 7.00 | 7 |

Mapping: \(3\to2\), \(4\to6\), \(5\to7\). The output histogram therefore has 6 pixels at level 2, 14 pixels at level 6 and 5 pixels at level 7.

**Note:** This solution uses nearest-integer rounding. If a course convention uses floor/truncation, the mapping may differ; the convention should be stated.

**Conclusion:** The CDF maps the occupied gray levels to a wider output range, improving contrast.

## Q5(a). Explain adaptive filtering method of restoring images. List its advantages. [7 marks]

### Answer
Adaptive filtering reduces noise by changing the amount of smoothing according to local image statistics. It is useful when a fixed filter would blur edges or fail to handle varying noise.

For a local window, calculate local mean \(\mu_L\) and variance \(\sigma_L^2\). If noise variance is \(\sigma_n^2\), a common adaptive local noise-reduction estimate is
\[
\hat f=g-\frac{\sigma_n^2}{\sigma_L^2}(g-\mu_L),
\]
where \(g\) is the observed pixel and practical implementations limit the ratio when needed.

**Steps:** select a window, calculate its mean and variance, estimate noise variance, adjust the output according to the local statistics, and move the window over the image. Uniform areas receive stronger smoothing; high-variance areas retain more detail.

**Advantages:** (1) adapts to local conditions; (2) removes noise in smooth areas; (3) preserves edges better than fixed averaging; (4) works with spatially varying image content; and (5) reduces unnecessary blur.

**Conclusion:** Adaptive filters use local statistics to balance noise removal and preservation of image details.

## Q5(b). Explain erosion and dilation operations used for morphological processing. [7 marks]

### Answer
Morphological processing studies image shape using a structuring element. Erosion and dilation are its two basic operations.

**Erosion:** Shrinks foreground objects. A foreground pixel remains only if the structuring element fits completely inside the foreground region. In set notation,
\[
A\ominus B=\{z:B_z\subseteq A\}.
\]
It removes small protrusions, reduces object size and may break narrow connections.

**Dilation:** Expands foreground objects. It adds pixels around object boundaries when the structuring element overlaps the foreground. A common definition is
\[
A\oplus B=\{z:(\hat B)_z\cap A\ne\emptyset\}.
\]
It fills small gaps and can connect nearby components.

**Applications:** removing noise, separating or joining objects, boundary extraction and shape analysis. Opening is erosion followed by dilation; closing is dilation followed by erosion.

**Conclusion:** Erosion contracts objects and dilation expands them; the structuring element controls the shape and extent of the operation.

## Q6(a). Explain the basic model of image restoration. Explain any four important noise probability density functions. [7 marks]

### Answer
Image restoration estimates an original image from an observed image degraded by blur and noise. The basic model is
\[
g(x,y)=h(x,y)*f(x,y)+\eta(x,y),
\]
where \(f\) is the original image, \(h\) is the degradation function, \(\eta\) is noise and \(g\) is the observed image.

Four noise PDFs are:

1. **Gaussian:**
\[
p(z)=\frac{1}{\sqrt{2\pi}\sigma}e^{-(z-\mu)^2/(2\sigma^2)}.
\]
It is bell-shaped and commonly models sensor/electronic noise.
2. **Uniform:** \(p(z)=1/(b-a)\) for \(a\le z\le b\); all values in the interval are equally likely.
3. **Rayleigh:** \(p(z)=\frac{2}{b}(z-a)e^{-(z-a)^2/b}\), for \(z\ge a\); it is an asymmetric distribution.
4. **Exponential:** \(p(z)=a e^{-az}\), for \(z\ge0\); probability decreases exponentially.

Other models include Erlang/Gamma and impulse noise. The choice of restoration method depends on the assumed noise model.

**Conclusion:** The degradation model and noise PDF help select filters to estimate the original image.

## Q6(b). Explain, in brief, the properties of two-dimensional Fourier Transform. [7 marks]

### Answer
The 2-D Fourier Transform converts a spatial image into frequency components:
\[
F(u,v)=\int\!\int f(x,y)e^{-j2\pi(ux+vy)}dxdy.
\]
Important properties are:
1. **Linearity:** the transform of a weighted sum is the weighted sum of transforms.
2. **Translation:** spatial shifting adds a phase factor to the transform.
3. **Conjugate symmetry:** for real images, \(F(-u,-v)=F^*(u,v)\).
4. **Convolution:** spatial convolution becomes multiplication in the frequency domain.
5. **Multiplication:** spatial multiplication becomes frequency-domain convolution, apart from normalization.
6. **Separability:** 2-D DFT can be computed by row and column 1-D transforms.
7. **Parseval's theorem:** spatial energy equals appropriately scaled frequency-domain energy.

**Conclusion:** These properties make the 2-D Fourier Transform useful for image filtering, restoration and frequency analysis.

## Q7(a). Explain Wiener filtering in image processing. [7 marks]

### Answer
Wiener filtering is a statistical restoration method that estimates an original image from a degraded, noisy observation while minimizing mean-square error.

The frequency-domain degradation model is
\[
G(u,v)=H(u,v)F(u,v)+N(u,v).
\]
The Wiener filter is
\[
W(u,v)=\frac{H^*(u,v)}{|H(u,v)|^2+S_N(u,v)/S_F(u,v)},
\]
where \(H\) is the degradation function, \(S_N\) is noise power spectrum and \(S_F\) is original-image power spectrum. The restored spectrum is \(\hat F=WG\).

**Steps:** estimate the blur and noise characteristics, compute the DFT of the degraded image, multiply by the Wiener filter, and take the inverse DFT.

**Advantages:** performs deblurring and noise reduction together, avoids excessive noise amplification compared with simple inverse filtering, and minimizes expected squared error under the model assumptions. **Limitation:** accurate estimates of blur and signal/noise statistics may not be available.

**Conclusion:** Wiener filtering provides a balance between deblurring and noise suppression.

## Q7(b). Draw the block diagram for converting gray-level intensity to colour transformation and explain it. [7 marks]

### Answer
Gray-to-colour transformation, also called pseudocolour processing, assigns an RGB colour to each grayscale intensity. It makes selected intensity differences easier to visualize.

```text
Grayscale image
      |
      v
Read intensity r
      |
      v
Colour map / lookup table
    /    |    \
   v     v     v
 T_R(r) T_G(r) T_B(r)
   \     |     /
      v
Combine R, G and B
      |
      v
Pseudocolour image
```

Each gray level \(r\) is passed through three mapping functions: \(R=T_R(r)\), \(G=T_G(r)\), and \(B=T_B(r)\). The three output components form a colour pixel.

**Methods:** intensity slicing assigns a specific colour to each gray-level interval; continuous mapping assigns gradually changing colours using a lookup table or mathematical functions.

**Applications:** medical images, thermal imagery, satellite data and scientific visualization.

**Conclusion:** Pseudocolour transformation changes the display representation of gray levels; it does not add new information to the original image.

## Q8. Short notes — answer all five options (the paper asks any two).

### (a) Uniform and Non-uniform Quantization
Uniform quantization divides the intensity range into equal-width intervals and assigns one representative output level to each interval. It is simple and easy to implement. Non-uniform quantization uses unequal interval widths, allocating more levels to important intensity ranges or where finer accuracy is required. Uniform quantization is suitable when the signal range is treated evenly; non-uniform quantization may better match the statistical or perceptual properties of the image. Both trade representation precision against the number of bits.

### (b) Perspective Projection
Perspective projection models how a 3-D scene is projected onto a 2-D image plane through a camera centre. Objects farther from the camera appear smaller, and parallel lines may converge at vanishing points. In a simplified pinhole camera model, image coordinates are proportional to \(x'=fX/Z\), \(y'=fY/Z\), where \(f\) is focal length and \((X,Y,Z)\) is a 3-D point in camera coordinates. Perspective projection is used in image formation, camera geometry and geometric correction.

### (c) Band-Pass Filter
A band-pass filter passes a selected band of spatial frequencies while attenuating frequencies below and above that band. It can isolate textures or features in a particular frequency range. Band-pass filters may be ideal, Butterworth or Gaussian. Their design specifies a centre frequency and bandwidth. They are useful in frequency analysis but can also suppress image information outside the selected band.

### (d) Edge Linking
Edge linking connects edge pixels or fragments detected by a gradient or other edge detector. It is needed because weak contrast and noise can break true contours into separate pieces. Local methods compare gradient magnitude, orientation and proximity; global methods such as the Hough transform identify supported lines or curves. Edge linking helps form continuous object boundaries for segmentation and recognition.

### (e) Boundary Detection
Boundary detection identifies the contour separating an object from its background or neighbouring regions. It uses intensity discontinuities, gradients, Laplacian zero crossings, thresholding and edge linking. A valid boundary should be spatially coherent and often approximately closed. Boundary detection is used in object measurement, shape analysis and segmentation.

---

# Cross-Year Revision Notes

## Frequently repeated topics

| Topic | Years in supplied PDF |
|---|---|
| Sampling and quantization | 2025, 2024, 2023, 2022, 2021 |
| DIP system components | 2025, 2024, 2022, 2021 |
| Image sensing and acquisition | 2025, 2024 |
| Histogram processing / equalization | 2025, 2024, 2022, 2021 |
| Frequency-domain smoothing / low-pass filters | 2024, 2022, 2021 |
| Adaptive filtering | 2025, 2024, 2023, 2022, 2021 |
| 2-D Fourier Transform | 2025, 2024, 2022 |
| Wiener filtering | 2025, 2024, 2022, 2021 |
| Region-based segmentation | 2025, 2024, 2023, 2022 |
| Edge linking / boundary detection | 2025, 2023, 2021 |
| Morphological erosion and dilation | 2024, 2022, 2021 |
| Gray-level to colour transformation | 2024, 2022, 2021 |

## Calculation conventions and source cautions

1. **Histogram equalization:** Worked examples state the rounding convention explicitly. A floor-based convention can produce different output levels from nearest-integer rounding.
2. **2025 median filter:** The input is a 3 × 6 matrix, so the valid 3 × 3 result is 1 × 4. Border output requires a padding convention not specified in the paper.
3. **2022 shortest-path question:** Path lengths count links, not pixels. The allowed set is \(V=\{1,2\}\); values 0 and 3 are excluded.
4. **2022 correlation/convolution question:** The paper gives \(f=00010000\) and \(W=12328\) without specifying lag origin or crop convention. The solution states a discrete-signal convention; an answer using a different correlation convention may appear reversed or shifted.
5. **Compression:** Course Outcome CO3 mentions image compression, but the detailed module list does not assign it a separate module. It is included because it appears in the 2024/2022 PYQs and is part of the supplied CO statement.
6. **2021 checkerboard effect:** The term is explained in the common image-sampling/resampling sense of a visible block/tile artefact. The paper does not supply a figure or a more specific definition.

**Final preparation rule:** Revise repeated topics first, but retain every year's original question and answer in this collection. The papers' “answer any five” instructions do not limit this study document.
